FROM node:18.18.2

RUN apt update && apt install -y curl bash git tar gzip libc++-dev

# RUN curl -L https://raw.githubusercontent.com/noir-lang/noirup/main/install | bash
RUN curl -L https://raw.githubusercontent.com/noir-lang/noirup/main/install | bash && \
    /bin/bash -c "source ~/.bashrc && noirup"
# Move nargo to a global location
# RUN mv /root/.nargo/bin/* /usr/local/bin

ENV PATH="/root/.nargo/bin:$PATH"
RUN noirup

# RUN nargo --version
# WORKDIR /usr/src/app

COPY yarn.lock ./
COPY package*.json ./
RUN yarn install

COPY . .

RUN yarn run build

EXPOSE 3000

CMD ["node", "lib/app.js"]
