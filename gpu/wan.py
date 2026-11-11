"""Wan 2.2 TI2V-5B (Apache 2.0) text-to-video on Modal free credit — mistake10 photoreal shots (owner 10 Nov: $0, no card).
py -m modal run gpu/wan.py --prompt "..." --name test --frames 49
Output is kept on the Modal volume "wan-out" and pulled in small chunks (this PC's network drops downloads > ~1 MB)."""
import modal

app = modal.App("moneyworks-wan")
vol = modal.Volume.from_name("wan-out", create_if_missing=True)
cache = modal.Volume.from_name("wan-cache", create_if_missing=True)
image = (modal.Image.debian_slim(python_version="3.11")
         .apt_install("ffmpeg")
         .pip_install("torch==2.5.1", "diffusers==0.35.1", "transformers==4.51.3", "accelerate==1.6.0", "ftfy", "imageio[ffmpeg]", "sentencepiece"))
MID = "Wan-AI/Wan2.2-TI2V-5B-Diffusers"
NEG = "cartoon, anime, text, subtitles, watermark, logo, blurry, low quality, deformed hands, extra fingers, static, still image"


@app.function(image=image, gpu="L4", timeout=3600, volumes={"/out": vol, "/root/.cache/huggingface": cache})
def gen(prompt: str, name: str, frames: int = 49, w: int = 704, h: int = 1280, steps: int = 30, seed: int = 7):
    import torch, time
    from diffusers import WanPipeline, AutoencoderKLWan
    from diffusers.utils import export_to_video
    t = time.time()
    vae = AutoencoderKLWan.from_pretrained(MID, subfolder="vae", torch_dtype=torch.float32)
    pipe = WanPipeline.from_pretrained(MID, vae=vae, torch_dtype=torch.bfloat16)
    pipe.enable_model_cpu_offload()
    out = pipe(prompt=prompt, negative_prompt=NEG, height=h, width=w, num_frames=frames, num_inference_steps=steps,
               guidance_scale=5.0, generator=torch.Generator("cuda").manual_seed(seed)).frames[0]
    export_to_video(out, f"/out/{name}.mp4", fps=24)
    vol.commit()
    print(f"done {name} in {time.time() - t:.0f}s")
    return name


@app.function(volumes={"/out": vol})
def chunk(name: str, i: int, size: int = 400_000) -> bytes:
    with open(f"/out/{name}.mp4", "rb") as f:
        f.seek(i * size)
        return f.read(size)


@app.local_entrypoint()
def main(prompt: str, name: str = "test", frames: int = 49, steps: int = 30):
    gen.remote(prompt, name, frames, steps=steps)
    import os
    os.makedirs("public/mistake10", exist_ok=True)
    data, i = b"", 0
    while True:
        part = chunk.remote(name, i)
        data += part
        if len(part) < 400_000:
            break
        i += 1
    open(f"public/mistake10/{name}.mp4", "wb").write(data)
    print("saved", name, len(data))


@app.local_entrypoint()
def get(name: str = "test"):
    """py -m modal run gpu/wan.py::get --name test  → pull a finished clip in 400 KB pieces"""
    import os
    os.makedirs("public/mistake10", exist_ok=True)
    data, i = b"", 0
    while True:
        part = chunk.remote(name, i)
        data += part
        if len(part) < 400_000:
            break
        i += 1
    open(f"public/mistake10/{name}.mp4", "wb").write(data)
    print("saved", name, len(data))
