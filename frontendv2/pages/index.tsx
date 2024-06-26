import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import circuit from '../utils/circuit/circuit.json';
import { BarretenbergBackend } from '@noir-lang/backend_barretenberg';
import { InputMap, Noir } from '@noir-lang/noir_js';
import React, { useEffect } from 'react';

const setupNoir = async () => {
  await Promise.all([
    import("@noir-lang/noirc_abi").then(module =>
      module.default(new URL("@noir-lang/noirc_abi/web/noirc_abi_wasm_bg.wasm", import.meta.url).toString())
    ),
    import("@noir-lang/acvm_js").then(module =>
      module.default(new URL("@noir-lang/acvm_js/web/acvm_js_bg.wasm", import.meta.url).toString())
    )
  ]);
};

const Home: NextPage = () => {
  useEffect(() => {
    const setup = async () => {
      try {
        // @ts-ignore
        const backend = new BarretenbergBackend(circuit);
        // @ts-ignore
        const noir = new Noir(circuit, backend);
        await setupNoir();
        /*
        const input = {
          hashed_message: [164, 203, 220, 225, 42, 66, 185, 220, 15, 227, 133, 185, 173, 31, 140, 158, 240, 178, 28, 114, 176, 37, 125, 159, 210, 53, 83, 45, 165, 90, 246, 25],
          pub_key_x: [208, 121, 2, 97, 142, 188, 221, 247, 39, 87, 202, 234, 163, 133, 108, 63, 132, 32, 127, 199, 9, 147, 194, 82, 164, 180, 160, 169, 182, 232, 250, 14],
          pub_key_y: [209, 122, 214, 145, 69, 154, 11, 87, 10, 42, 201, 160, 57, 165, 106, 116, 221, 12, 85, 151, 177, 27, 121, 59, 23, 153, 27, 18, 61, 181, 118, 173],
          signature: [32, 167, 70, 239, 73, 36, 71, 214, 211, 186, 65, 161, 123, 31, 80, 21, 170, 112, 182, 166, 241, 199, 43, 148, 49, 166, 156, 3, 121, 33, 199, 214, 34, 239, 37, 43, 223, 169, 122, 121, 236, 134, 162, 145, 184, 104, 46, 238, 163, 158, 233, 13, 11, 213, 207, 58, 1, 29, 178, 94, 206, 79, 227, 203],
          stealth_init: [97, 150, 181, 2, 255, 132, 80, 115, 151, 249, 160, 40, 11, 246, 198, 242, 234, 85, 61, 175, 221, 46, 87, 103, 53, 223, 211, 195, 75, 116, 105, 134],
          stealth_secret: [86, 87, 13, 226, 135, 215, 60, 209, 203, 96, 146, 187, 143, 222, 230, 23, 57, 116, 149, 95, 222, 243, 69, 174, 87, 158, 233, 244, 117, 234, 116, 50],
          ks_index: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          merkle_state_root: [80, 2, 1, 127, 133, 92, 188, 192, 238, 123, 214, 71, 106, 44, 174, 100, 99, 48, 1, 239, 171, 150, 208, 143, 13, 158, 156, 157, 41, 15, 17, 150],
          proofs: [
            // ['158', '172', '207', '61', '57', '118', '86', '244', '173', '55', '234', '129', '113', '146', '209', '78', '64', '216', '86', '221', '67', '162', '186', '193', '100', '33', '112', '13', '223', '97', '58', '7'],
            // ['142', '11', '197', '191', '118', '127', '243', '41', '171', '32', '175', '11', '244', '231', '73', '254', '33', '231', '155', '61', '88', '160', '210', '92', '3', '18', '232', '246', '129', '148', '5', '191'],
            // ['52', '105', '111', '14', '243', '55', '194', '15', '85', '146', '31', '94', '35', '174', '8', '31', '202', '59', '125', '15', '253', '82', '170', '37', '33', '54', '55', '113', '182', '235', '20', '117']
            [158, 172, 207, 61, 57, 118, 86, 244, 173, 55, 234, 129, 113, 146, 209, 78, 64, 216, 86, 221, 67, 162, 186, 193, 100, 33, 112, 13, 223, 97, 58, 7],
            [142, 11, 197, 191, 118, 127, 243, 41, 171, 32, 175, 11, 244, 231, 73, 254, 33, 231, 155, 61, 88, 160, 210, 92, 3, 18, 232, 246, 129, 148, 5, 191],
            [52, 105, 111, 14, 243, 55, 194, 15, 85, 146, 31, 94, 35, 174, 8, 31, 202, 59, 125, 15, 253, 82, 170, 37, 33, 54, 55, 113, 182, 235, 20, 117]
          ] as unknown as (InputMap | number)[],
        };
         */
        const input: InputMap = {
          hashed_message: [164, 203, 220, 225, 42, 66, 185, 220, 15, 227, 133, 185, 173, 31, 140, 158, 240, 178, 28, 114, 176, 37, 125, 159, 210, 53, 83, 45, 165, 90, 246, 25],
          pub_key_x: [208, 121, 2, 97, 142, 188, 221, 247, 39, 87, 202, 234, 163, 133, 108, 63, 132, 32, 127, 199, 9, 147, 194, 82, 164, 180, 160, 169, 182, 232, 250, 14],
          pub_key_y: [209, 122, 214, 145, 69, 154, 11, 87, 10, 42, 201, 160, 57, 165, 106, 116, 221, 12, 85, 151, 177, 27, 121, 59, 23, 153, 27, 18, 61, 181, 118, 173],
          signature: [32, 167, 70, 239, 73, 36, 71, 214, 211, 186, 65, 161, 123, 31, 80, 21, 170, 112, 182, 166, 241, 199, 43, 148, 49, 166, 156, 3, 121, 33, 199, 214, 34, 239, 37, 43, 223, 169, 122, 121, 236, 134, 162, 145, 184, 104, 46, 238, 163, 158, 233, 13, 11, 213, 207, 58, 1, 29, 178, 94, 206, 79, 227, 203],
          stealth_init: [97, 150, 181, 2, 255, 132, 80, 115, 151, 249, 160, 40, 11, 246, 198, 242, 234, 85, 61, 175, 221, 46, 87, 103, 53, 223, 211, 195, 75, 116, 105, 134],
          stealth_secret: [86, 87, 13, 226, 135, 215, 60, 209, 203, 96, 146, 187, 143, 222, 230, 23, 57, 116, 149, 95, 222, 243, 69, 174, 87, 158, 233, 244, 117, 234, 116, 50],
          ks_index: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
          merkle_state_root: [80, 2, 1, 127, 133, 92, 188, 192, 238, 123, 214, 71, 106, 44, 174, 100, 99, 48, 1, 239, 171, 150, 208, 143, 13, 158, 156, 157, 41, 15, 17, 150],
          proofs: [
            [158, 172, 207, 61, 57, 118, 86, 244, 173, 55, 234, 129, 113, 146, 209, 78, 64, 216, 86, 221, 67, 162, 186, 193, 100, 33, 112, 13, 223, 97, 58, 7],
            [142, 11, 197, 191, 118, 127, 243, 41, 171, 32, 175, 11, 244, 231, 73, 254, 33, 231, 155, 61, 88, 160, 210, 92, 3, 18, 232, 246, 129, 148, 5, 191],
            [52, 105, 111, 14, 243, 55, 194, 15, 85, 146, 31, 94, 35, 174, 8, 31, 202, 59, 125, 15, 253, 82, 170, 37, 33, 54, 55, 113, 182, 235, 20, 117]
          ] as unknown as (number | InputMap)[],
          /*
            [0]: [158, 172, 207, 61, 57, 118, 86, 244, 173, 55, 234, 129, 113, 146, 209, 78, 64, 216, 86, 221, 67, 162, 186, 193, 100, 33, 112, 13, 223, 97, 58, 7],
            [1]: [142, 11, 197, 191, 118, 127, 243, 41, 171, 32, 175, 11, 244, 231, 73, 254, 33, 231, 155, 61, 88, 160, 210, 92, 3, 18, 232, 246, 129, 148, 5, 191],
            [2]:[52, 105, 111, 14, 243, 55, 194, 15, 85, 146, 31, 94, 35, 174, 8, 31, 202, 59, 125, 15, 253, 82, 170, 37, 33, 54, 55, 113, 182, 235, 20, 117]
          },
           */
          // proofs: [
            // ['158', '172', '207', '61', '57', '118', '86', '244', '173', '55', '234', '129', '113', '146', '209', '78', '64', '216', '86', '221', '67', '162', '186', '193', '100', '33', '112', '13', '223', '97', '58', '7'],
            // ['142', '11', '197', '191', '118', '127', '243', '41', '171', '32', '175', '11', '244', '231', '73', '254', '33', '231', '155', '61', '88', '160', '210', '92', '3', '18', '232', '246', '129', '148', '5', '191'],
            // ['52', '105', '111', '14', '243', '55', '194', '15', '85', '146', '31', '94', '35', '174', '8', '31', '202', '59', '125', '15', '253', '82', '170', '37', '33', '54', '55', '113', '182', '235', '20', '117']
            // '[158, 172, 207, 61, 57, 118, 86, 244, 173, 55, 234, 129, 113, 146, 209, 78, 64, 216, 86, 221, 67, 162, 186, 193, 100, 33, 112, 13, 223, 97, 58, 7]',
            // '[142, 11, 197, 191, 118, 127, 243, 41, 171, 32, 175, 11, 244, 231, 73, 254, 33, 231, 155, 61, 88, 160, 210, 92, 3, 18, 232, 246, 129, 148, 5, 191]',
            // '[52, 105, 111, 14, 243, 55, 194, 15, 85, 146, 31, 94, 35, 174, 8, 31, 202, 59, 125, 15, 253, 82, 170, 37, 33, 54, 55, 113, 182, 235, 20, 117]'
          // ]
          // as unknown as (InputMap | number)[],
        };
        /*
        const input = {
          hashed_message: Array.of(164, 203, 220, 225, 42, 66, 185, 220, 15, 227, 133, 185, 173, 31, 140, 158, 240, 178, 28, 114, 176, 37, 125, 159, 210, 53, 83, 45, 165, 90, 246, 25),
          pub_key_x: Array.of(208, 121, 2, 97, 142, 188, 221, 247, 39, 87, 202, 234, 163, 133, 108, 63, 132, 32, 127, 199, 9, 147, 194, 82, 164, 180, 160, 169, 182, 232, 250, 14),
          pub_key_y: Array.of(209, 122, 214, 145, 69, 154, 11, 87, 10, 42, 201, 160, 57, 165, 106, 74, 221, 12, 85, 151, 177, 27, 121, 59, 23, 153, 27, 18, 61, 181, 118, 173),
          signature: Array.of(32, 167, 70, 239, 73, 36, 71, 214, 211, 186, 65, 161, 123, 31, 80, 21, 170, 112, 182, 166, 241, 199, 43, 148, 49, 166, 156, 3, 121, 33, 199, 214, 34, 239, 37, 43, 223, 169, 122, 121, 236, 134, 162, 145, 184, 104, 46, 238, 163, 158, 233, 13, 11, 213, 207, 58, 1, 29, 178, 94, 206, 79, 227, 203),
          stealth_init: Array.of(97, 150, 181, 2, 255, 132, 80, 115, 151, 249, 160, 40, 11, 246, 198, 242, 234, 85, 61, 175, 221, 46, 87, 103, 53, 223, 211, 195, 75, 116, 105, 134),
          stealth_secret: Array.of(86, 87, 13, 226, 135, 215, 60, 209, 203, 96, 146, 187, 143, 222, 230, 23, 57, 116, 149, 95, 222, 243, 69, 174, 87, 158, 233, 244, 117, 234, 116, 50),
          ks_index: Array.of(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
          merkle_state_root: Array.of(80, 2, 1, 127, 133, 92, 188, 192, 238, 123, 214, 71, 106, 44, 174, 100, 99, 48, 1, 239, 171, 150, 208, 143, 13, 158, 156, 157, 41, 15, 17, 150),
          proofs: Array.of(
            Array.of('[158, 172, 207, 61, 57, 118, 86, 244, 173, 55, 234, 129, 113, 146, 209, 78, 64, 216, 86, 221, 67, 162, 186, 193, 100, 33, 112, 13, 223, 97, 58, 7]'),
            // Array.of(142, 11, 197, 191, 118, 127, 243, 41, 171, 32, 175, 11, 244, 231, 73, 254, 33, 231, 155, 61, 88, 160, 210, 92, 3, 18, 232, 246, 129, 148, 5, 191),
            // Array.of(52, 105, 111, 14, 243, 55, 194, 15, 85, 146, 31, 94, 35, 174, 8, 31, 202, 59, 125, 15, 253, 82, 170, 37, 33, 54, 55, 113, 182, 235, 20, 117),
          ),
        };
        */
        const proofData = await noir.generateProof(input);
        console.log(proofData);
      } catch (e) {
        console.error(e);
      }
    };
    setup().then(() => {
      console.log('setup completed');
    });
  }, []);
  return (
    <div className={styles.container}>
      <Head>
        <title>RainbowKit App</title>
        <meta
          content="Generated by @rainbow-me/create-rainbowkit"
          name="description"
        />
        <link href="/favicon.ico" rel="icon" />
      </Head>

      <main className={styles.main}>
        <ConnectButton />

        <h1 className={styles.title}>
          Welcome to <a href="">RainbowKit</a> + <a href="">wagmi</a> +{' '}
          <a href="https://nextjs.org">Next.js!</a>
        </h1>

        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.tsx</code>
        </p>

        <div className={styles.grid}>
          <a className={styles.card} href="https://rainbowkit.com">
            <h2>RainbowKit Documentation &rarr;</h2>
            <p>Learn how to customize your wallet connection flow.</p>
          </a>

          <a className={styles.card} href="https://wagmi.sh">
            <h2>wagmi Documentation &rarr;</h2>
            <p>Learn how to interact with Ethereum.</p>
          </a>

          <a
            className={styles.card}
            href="https://github.com/rainbow-me/rainbowkit/tree/main/examples"
          >
            <h2>RainbowKit Examples &rarr;</h2>
            <p>Discover boilerplate example RainbowKit projects.</p>
          </a>

          <a className={styles.card} href="https://nextjs.org/docs">
            <h2>Next.js Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a
            className={styles.card}
            href="https://github.com/vercel/next.js/tree/canary/examples"
          >
            <h2>Next.js Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            className={styles.card}
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a href="https://rainbow.me" rel="noopener noreferrer" target="_blank">
          Made with ❤️ by your frens at 🌈
        </a>
      </footer>
    </div>
  );
};

export default Home;
