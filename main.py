import asyncio
import json
import os
import websockets
import base64
import io
import wave
from pydub import AudioSegment
from google import genai
import google.generativeai as generative

# API Key Configuration (backchodi mt krna iske sath lwde)
GEMINI_API_KEY = "AIzaSyB0Omt3iXk4QD_g4VjDHJEqFQt-xWg159Y"
os.environ['GOOGLE_API_KEY'] = GEMINI_API_KEY
generative.configure(api_key=GEMINI_API_KEY)

MODEL_NAME = "gemini-2.0-flash-exp"
TRANSCRIPTION_MODEL = "gemini-1.5-flash-8b"

client = genai.Client(
    api_key=GEMINI_API_KEY,
    http_options={'api_version': 'v1alpha'}
)

def transcribe_audio(audio_data):
    """Transcribes audio using the specified model."""
    try:
        if not audio_data:
            return "No audio data received."

        # Convert PCM data to MP3
        mp3_audio = convert_pcm_to_mp3(audio_data)
        if not mp3_audio:
            return "Audio conversion to MP3 failed."

        prompt = (
            "Generate a transcript of the speech. "
            "Avoid adding extra text. If the speech is unclear, respond '<Not recognizable>'."
        )

        transcription_client = generative.GenerativeModel(model_name=TRANSCRIPTION_MODEL)
        response = transcription_client.generate_content([
            prompt,
            {"mime_type": "audio/mp3", "data": base64.b64decode(mp3_audio)}
        ])

        return response.text
    except Exception as error:
        print(f"Transcription error: {error}")
        return "Transcription failed."

def convert_pcm_to_mp3(pcm_data):
    """Converts PCM audio data to a base64-encoded MP3 string."""
    try:
        wav_buffer = io.BytesIO()
        with wave.open(wav_buffer, 'wb') as wav_file:
            wav_file.setnchannels(1)  # Mono
            wav_file.setsampwidth(2)  # 16-bit samples
            wav_file.setframerate(24000)  # 24 kHz
            wav_file.writeframes(pcm_data)

        wav_buffer.seek(0)
        audio_segment = AudioSegment.from_wav(wav_buffer)
        mp3_buffer = io.BytesIO()
        audio_segment.export(mp3_buffer, format="mp3", codec="libmp3lame")

        return base64.b64encode(mp3_buffer.getvalue()).decode('utf-8')
    except Exception as error:
        print(f"Error during PCM to MP3 conversion: {error}")
        return None

async def gemini_session_handler(client_ws: websockets.WebSocketServerProtocol):
    """Handles websocket communication with the Gemini API."""
    try:
        setup_msg = await client_ws.recv()
        setup_data = json.loads(setup_msg)
        session_config = setup_data.get("setup", {})

        async with client.aio.live.connect(model=MODEL_NAME, config=session_config) as session:
            print("Connected to Gemini API")

            async def send_to_gemini():
                """Relays client messages to the Gemini API."""
                try:
                    async for msg in client_ws:
                        try:
                            payload = json.loads(msg)
                            if "realtime_input" in payload:
                                for chunk in payload["realtime_input"].get("media_chunks", []):
                                    await session.send(chunk)
                        except Exception as err:
                            print(f"Error relaying to Gemini: {err}")
                except Exception as error:
                    print(f"Client send loop error: {error}")

            async def receive_from_gemini():
                """Receives and processes responses from the Gemini API."""
                try:
                    while True:
                        async for response in session.receive():
                            if response.server_content is None:
                                print(f"Unhandled server message: {response}")
                                continue

                            model_turn = response.server_content.model_turn
                            if model_turn:
                                for part in model_turn.parts:
                                    if hasattr(part, 'text') and part.text:
                                        await client_ws.send(json.dumps({"text": part.text}))
                                    elif hasattr(part, 'inline_data') and part.inline_data:
                                        audio_b64 = base64.b64encode(part.inline_data.data).decode('utf-8')
                                        await client_ws.send(json.dumps({"audio": audio_b64}))

                                        if not hasattr(session, 'audio_data'):
                                            session.audio_data = b''
                                        session.audio_data += part.inline_data.data

                            if response.server_content.turn_complete:
                                transcribed_text = transcribe_audio(session.audio_data)
                                await client_ws.send(json.dumps({"text": transcribed_text}))
                                session.audio_data = b''
                except Exception as error:
                    print(f"Gemini receive loop error: {error}")

            await asyncio.gather(
                asyncio.create_task(send_to_gemini()),
                asyncio.create_task(receive_from_gemini())
            )
    except Exception as error:
        print(f"Session handler error: {error}")

async def main():
    """Starts the WebSocket server."""
    server_host = "0.0.0.0"
    server_port = 9083

    print(f"Starting server on {server_host}:{server_port}")
    async with websockets.serve(gemini_session_handler, server_host, server_port):
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())


    