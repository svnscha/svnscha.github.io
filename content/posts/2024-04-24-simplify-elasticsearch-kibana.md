+++
title = "Simplify Elasticsearch and Kibana Installation"
date = "2024-04-24"
description = "Let me walk you through how I created a bash script that sets up Elasticsearch and Kibana on a single-node cluster with minimal fuss."
+++

## Why, You Ask?
Every time I set up a new instance of Elasticsearch and Kibana, the repetitive steps grated on me. Updating the system, configuring repositories, installing packages... surely there's a better way? And thus, the quest for automation began. Not only to save my own time but to provide a robust foundation for others in the community facing the same tedious setup.

**It's time-consuming and frustrating. I'm tired of it.**

## Automating Elasticsearch and Kibana Setup: A Journey to Simplicity
In our ever-expanding digital landscape, data is no longer just a resource; it's an entire ecosystem. Managing this ecosystem efficiently requires robust tools like Elasticsearch and Kibana. But let's be honest, the setup can be a drag! Inspired by my own need for simplification and a love for automating mundane tasks, I embarked on a journey to streamline this setup process. Let me walk you through how I created a bash script that sets up Elasticsearch and Kibana on a single-node cluster with minimal fuss.

## Why Choose a Bash Script?
You might be wondering why I opted for a Bash script over more sophisticated tools like Ansible. Well, the answer is straightforward: I appreciate simplicity. Bash scripts are incredibly versatile—perfect for cloud-init scripts in my homelab or even within Docker environments. This approach keeps things simple, avoiding the need for extra tools or complexities. It's just easier that way!

## Building the Script: A Step-by-Step Guide
Let's walk through the crafting of the script that automates setting up Elasticsearch and Kibana. Here's how I pieced it together, one step at a time:

1. Checking for Superuser Privileges
Every great adventure starts with a little bit of power. What's more powerful than starting off with full system access?

```bash
if [ "$(id -u)" != "0" ]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi
```

2. Updating the System and Installing Essential Packages
Think of this as prepping your car before a long road trip. A well-oiled machine avoids breakdowns, and that's exactly what we're aiming for—no surprises!

```bash
apt update
apt install -y apt-transport-https gnupg curl jq
```

3. Adding the Elasticsearch Repository
Getting this right is like picking the perfect ingredients for a master chef recipe—it ensures the rest of the meal turns out just right.

4. Installing Elasticsearch and Kibana
This is where the transformation happens. What was once a bare-metal server soon becomes a powerful tool capable of sifting through vast amounts of data.

5. Configuring and Starting Services
The plot thickens! Setting up the services and getting them running is like reaching the climax of our story—where all elements come together to unveil the full potential of our setup.

Rather than churn out another cookie-cutter guide on setting up Elasticsearch and Kibana, you can view the complete script [here](https://gist.github.com/svnscha/676291c9e1cdbfa261202b3897afba37). However, I do want to emphasize the initial configuration process involving enrollment tokens and security settings. I've automated these aspects because, let's face it, I've read too many guides that suggest just turning off security for the sake of simplicity. That's not my style—I'd rather keep things secure automatically. It's not rocket science, but it sure is critical. Why simplify by compromising security when you can automate it effectively, right?

This approach ensures you get the functionality you need without the hassle of manual setup or the risks of disabled security.

## Perfecting the Automation: Securing and Finalizing the Setup
As we approach the climax of our automation journey, it's all about ensuring that our Elasticsearch and Kibana setup not only functions but is also secured and ready for action. This part of the script is where the real magic happens—turning a fresh install into a secured and operational data exploration environment.

1. Broadcasting the Good News
First things first, let's make sure any user logging into the system knows what's been accomplished:

```bash
echo -e "=== init-vm.sh: Initial ===" >> /etc/motd
echo -e "[> Elasticsearch 'elastic' password: $ELASTIC_PASSWORD" >> /etc/motd
echo -e "[> Test instance with 'curl -k -X GET https://elastic:$ELASTIC_PASSWORD@localhost:9200'" >> /etc/motd
echo -e "=== init-vm.sh: Get started ===" >> /etc/motd
echo -e "[> Reset 'elastic' password with '/usr/share/elasticsearch/bin/elasticsearch-reset-password -u elastic'." >> /etc/motd

```

Here, we're updating the message of the day (MOTD) file to ensure anyone who logs in is immediately informed about how to interact with Elasticsearch and what steps to take next. It's like leaving a note on the fridge - impossible to ignore and incredibly helpful.

2. Decoding the Secrets
Automation isn't just about doing things without human intervention; it's also about doing them securely and wisely:

```bash
# Because who likes doing setup manually, right?
decoded_token=$(echo $KIBANA_ENROLLMENT_TOKEN | base64 --decode)
address=$(echo $decoded_token | jq -r '.adr[0]')
fingerprint=$(echo $decoded_token | jq -r '.fgr')
api_key=$(echo $decoded_token | jq -r '.key')
```

Decoding the enrollment token reveals the essential elements needed to securely configure Kibana: the address, fingerprint, and API key.

Harnessing Version and Build Information
Knowing exactly which version and build of Kibana you're working with is required for the API, so let's get that:

```bash
ver=$(jq -r '.version' /usr/share/kibana/package.json)
build=$(jq -r '.build.number' /usr/share/kibana/package.json)
```

3. Re-encoding and Verification
Secrecy is paramount, and so is verification. Here's how we handle both:

```bash
encoded_api_key=$(echo -n $api_key | base64)
output=$(sudo /usr/share/kibana/bin/kibana-verification-code)
verification_code=$(echo $output | awk -F": " '{print $2}' | sed 's/ //g')
```

The API key needs to be re-encoded to maintain security, and we also extract a verification code necessary for the next step—enrolling Kibana.

## The Final Act: Enrolling Kibana
And now, the final piece of our automation puzzle:

```bash
curl -k -v -X POST "http://localhost:5601/internal/interactive_setup/enroll" \
     -H "Accept: */*" \
     -H "Content-Type: application/json" \
     -H "Host: localhost:5601" \
     -H "Origin: http://localhost:5601" \
     -H "Referer: http://localhost:5601/" \
     -H "kbn-build-number: $build" \
     -H "kbn-version: $ver" \
     -H "x-elastic-internal-origin: Kibana" \
     -H "x-kbn-context: %7B%22type%22%3A%22application%22%2C%22name%22%3A%22interactiveSetup%22%2C%22url%22%3A%22%2F%22%7D" \
     -d '{"hosts":["https://'$address'"],"apiKey":"'$encoded_api_key'","caFingerprint":"'$fingerprint'","code":"'$verification_code'"}'
```

This curl command not only sends all the needed parameters to Kibana for configuration but also uses the verification code to ensure that the setup is both authorized and secure. It's akin to dotting the i's and crossing the t's in our setup script.

### Wrapping Up
From the mundane to the technical, every line of code we've added builds towards making Elasticsearch and Kibana not just operational but secured and ready for whatever data you throw at it. Feel free to dive into the full script, tweak it, use it, and share it. After all, isn't the whole point of automation to make life a bit easier?

Check out the complete script here:

- [init-elastic-search-kibana-vm.sh](https://gist.github.com/svnscha/676291c9e1cdbfa261202b3897afba37)

Happy automating, and here's to many insightful data explorations!

P.S.: This script is tailored for automating development environments. Remember, a single-node cluster isn’t suited for production use, and storing passwords in the message of the day (MOTD) file? That’s a no-go for serious deployments. 😏