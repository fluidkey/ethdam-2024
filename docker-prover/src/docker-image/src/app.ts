import assert from 'assert';
import { exec } from 'node:child_process';
import { writeFileSync } from 'node:fs';
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import { readFileSync } from "fs";

const app = express();
const port = 8080;

app.use(bodyParser.json({ limit: '100mb' }));
app.get('/api/health-check', (req: Request, res: Response) => {
  res.send(`OK, ${req.path}`);
});

async function generateProofAndReadFile(): Promise<string> {
  return new Promise((resolve, reject) => {
    exec('cd src/circuit && /root/.nargo/bin/nargo prove', (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        reject(error);
        return;
      }
      if (stdout === '' && stderr === '') {
        console.log('zk proof generated');
        const content = readFileSync('src/circuit/proofs/ksru.proof', 'utf8');
        resolve(`0x${content}`);
      }
    });
  });
}

app.post('/zk-proof', async (req: Request, res: Response) => {
  try {
    const {
      // proofs_position,
      proofs,
      merkle_state_root,
      ks_index,
      stealth_init,
      signature,
      pub_key_y,
      pub_key_x,
      hashed_message,
      stealth_secret,
    } = req.body;
    console.log(req.body);
    // assert(proofs_position, 'proofs_position is required');
    assert(!!proofs, 'proofs is required');
    assert(!!merkle_state_root, 'merkle_state_root is required');
    assert(!!ks_index, 'ks_index is required');
    assert(!!stealth_init, 'stealth_init is required');
    assert(!!signature, 'signature is required');
    assert(!!pub_key_y, 'pub_key_y is required');
    assert(!!pub_key_x, 'pub_key_x is required');
    assert(!!hashed_message, 'hashed_message is required');
    assert(!!stealth_secret, 'stealth_secret is required');
    // create the Prover.toml file in circuit/src/ folder
    const proverToml = `proofs = ${JSON.stringify(proofs)}\n` +
      `merkle_state_root = ${JSON.stringify(merkle_state_root)}\n`+
      `ks_index = ${JSON.stringify(ks_index)}\n`+
      `stealth_init = ${JSON.stringify(stealth_init)}\n`+
      `signature = ${JSON.stringify(signature)}\n` +
      `pub_key_y = ${JSON.stringify(pub_key_y)}\n` +
      `pub_key_x = ${JSON.stringify(pub_key_x)}\n`+
      `hashed_message = ${JSON.stringify(hashed_message)}\n` +
      `stealth_secret = ${JSON.stringify(stealth_secret)}\n`;
    writeFileSync('src/circuit/Prover.toml', proverToml, {
      flag: 'w+',
    });
    const zkProof = await generateProofAndReadFile();
    return res.status(201).send({
      proof: zkProof,
    });
  } catch ( e ) {
    console.error(e);
    return res.status(400).send({ errorMessage: 'Generic error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
