+++
title = "Exploring AI: Self Hosted LLM"
date = "2025-03-17"
description = "Because running your own AI is the real power move."
+++

# Why, You Ask?

So, I decided to self-host an LLM. Why? Every time you use an online AI model, you're handing over your data to some company. Whether it's casual conversations, coding snippets, or business-related queries, everything you type is potentially being logged, analyzed, or even used to train future models. No thanks.

Instead, I prefer to keep things local. Also, I have an RTX ADA 4000 with 20GB of memory sitting here, so why not put it to good use?

Enter [Ollama](https://ollama.com/), an absurdly flexible service that makes running LLMs locally a breeze. Combine that with [Open WebUI](https://github.com/open-webui/open-webui), which ties everything together into a neat little interface, and of course, my go-to Nginx reverse proxy for easy access.

Let's break down the setup.

## Step 1: Install Ollama

Ollama makes deploying LLMs locally ridiculously simple. Here's how to install it:

```bash
curl -fsSL https://ollama.com/install.sh | sh
```

This will install Ollama and set up everything you need to start running models locally. Want to make sure it's working? Just run:

```bash
ollama run codellama:13b
```

If you see an interactive prompt, congrats - you've got a local LLM running!

## Step 2: Install Open WebUI

Ollama is great, but a web interface makes it even better. That's where Open WebUI comes in. It gives you a sleek, chat-like interface to interact with your models.

To install Open WebUI manually without Docker, follow these steps:

### 1. Create a Virtual Environment

```bash
python3 -m venv ~/openwebui-venv
source ~/openwebui-venv/bin/activate
```

### 2. Install Open WebUI

```bash
pip install open-webui
```

### 3. Create a Systemd Service

To make sure Open WebUI runs on startup, create a systemd service file:

```bash
sudo nano /etc/systemd/system/openwebui.service
```

Paste the following content:

```bash
[Unit]
Description=Open WebUI Service
After=network.target

[Service]
User=$USER
Group=$USER
WorkingDirectory=/home/$USER/openwebui-venv
ExecStart=/home/$USER/openwebui-venv/bin/open-webui
Restart=always

[Install]
WantedBy=multi-user.target
```

Save and exit, then reload systemd and enable the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable openwebui.service
sudo systemctl start openwebui.service
```

## Step 3: Reverse Proxy with Nginx

Now, let's make accessing our LLM easier by setting up an Nginx reverse proxy. This way, we can reach Open WebUI without exposing it directly.

Here's a basic Nginx config:

```
server {
    listen 443 ssl;
    server_name chat.example.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}
```

Reload Nginx with:

```bash
sudo systemctl restart nginx
```

Now, you can access your self-hosted LLM via `https://chat.example.com`. Fancy.

## You Own Your Data Now

One of the biggest advantages of self-hosting an LLM? Your data stays with you.

No sending queries to an external API, no third-party tracking what you're asking, no potential leaks of sensitive information. It's all running on your hardware, fully under your control. Whether you're experimenting with code, processing confidential documents, or just having fun chatting with AI, everything stays local.

## Model Sizes & Performance

Of course, different models come with different memory requirements. Here's what I'm running on my RTX ADA 4000 and how much VRAM they use:

```
NAME             ID              SIZE      PROCESSOR    UNTIL              
codellama:7b     8fdf8f752f6e    9.4 GB    100% GPU     2 minutes from now    
codellama:13b    9f438cb9cd58    15 GB     100% GPU     4 minutes from now    
gemma3:12b       6fd036cefda5    13 GB     100% GPU     4 minutes from now    
```

This means I can comfortably run mid-sized models like `codellama:13b` while keeping things snappy.

## Choosing the Right GPU
Picking the right GPU is all about balancing performance, VRAM, and cost - because, let's be honest, unless you're running an AI research lab, you're not dropping $30,000 on an H100.

Here's a quick breakdown of solid options:

- NVIDIA RTX 3090 - Powerful, with 24 GB of VRAM, but it's last-gen. ($$)
- NVIDIA RTX 4090 - Even more powerful, with 24 GB of VRAM and better efficiency. ($$$)
- NVIDIA RTX 5090 - Even more and more powerful, with 24 GB of VRAM and better efficiency. ($$$$)
- NVIDIA RTX 4000 ADA Generation - Less powerful, but 20 GB of VRAM, and a low-profile card. ($)

Now, why the ADA 4000? While the RTX 5090 is the fastest in raw compute power, VRAM is king for training AI models. The ADA 4000's 20 GB VRAM gives you enough room for Stable Diffusion training, larger batch sizes, and AI experiments, without hitting the limits of other consumer GPUs such as 3080 (10 GB).

Performance-wise, the 4090 and 5090 has more horsepower, but for training workloads where memory matters more than raw speed, the ADA 4000 is the more practical and cost-efficient choice. Plus, lower power consumption makes it a better long-term option if you're running AI workloads frequently. Also, the physical size - I mean it's a low profile card. Small, fits perfectly into any case.

At the end of the day, if you're serious about AI training and need a balance of VRAM, price, and efficiency, the ADA 4000 is the way to get started.

## Example

### Asking codellama:13b

Prompt: `implement fibonacci in python and also some unit tests using pytest`

<video src="/casts/codellama-13b-fibonacci.webm" controls>
  Your browser does not support the video tag.
</video>

### Asking gemma3:12b

Prompt: `implement fibonacci in python and also some unit tests using pytest`

<video src="/casts/gemma3-12b-fibonacci.webm" controls>
  Your browser does not support the video tag.
</video>

## Wrapping Up

With an RTX ADA 4000, Ollama, Open WebUI, and an Nginx reverse proxy, I now have an AI-powered assistant running entirely on my own hardware. No subscriptions, no cloud dependencies, just raw, local AI power. If you're serious about AI and privacy, setting this up is a no-brainer. Give it a try, and let your GPU do some work.
