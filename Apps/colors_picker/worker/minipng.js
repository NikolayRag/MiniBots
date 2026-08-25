// png.js
export function encodePNG(width, height, rgba) {
  if (rgba.length !== width * height * 4)
    throw new Error("Invalid RGBA data");

  const raw = new Uint8Array(height * (width * 4 + 1));

  // PNG scanlines: filter byte 0 + RGBA pixels
  for (let y = 0; y < height; y++) {
    const src = y * width * 4;
    const dst = y * (width * 4 + 1);

    raw[dst] = 0;
    raw.set(rgba.subarray(src, src + width * 4), dst + 1);
  }

  // zlib + DEFLATE stored blocks
  const z = [];
  z.push(0x78, 0x01); // zlib header: no compression

  let pos = 0;

  while (pos < raw.length) {
    const len = Math.min(65535, raw.length - pos);
    const last = pos + len === raw.length;

    z.push(last ? 1 : 0);

    z.push(len & 255, len >>> 8);
    const n = (~len) & 0xffff;
    z.push(n & 255, n >>> 8);

    for (let i = 0; i < len; i++)
      z.push(raw[pos + i]);

    pos += len;
  }

  // Adler-32
  let a = 1;
  let b = 0;

  for (let i = 0; i < raw.length; i++) {
    a = (a + raw[i]) % 65521;
    b = (b + a) % 65521;
  }

  const adler =
    (((b << 16) | a) >>> 0);

  z.push(
    adler >>> 24,
    adler >>> 16 & 255,
    adler >>> 8 & 255,
    adler & 255
  );

  const idat = Uint8Array.from(z);

  const chunks = [
    chunk(
      "IHDR",
      u32(width),
      u32(height),
      Uint8Array.from([
        8, // bit depth
        6, // RGBA
        0, 0, 0
      ])
    ),
    chunk("IDAT", idat),
    chunk("IEND")
  ];

  const total =
    8 + chunks.reduce((n, x) => n + x.length, 0);

  const png = new Uint8Array(total);

  // PNG signature
  png.set([
    137, 80, 78, 71, 13, 10, 26, 10
  ]);

  let offset = 8;

  for (const c of chunks) {
    png.set(c, offset);
    offset += c.length;
  }

  return png;
}

function u32(n) {
  return Uint8Array.from([
    n >>> 24,
    n >>> 16 & 255,
    n >>> 8 & 255,
    n & 255
  ]);
}

function chunk(type, ...parts) {
  const data = concat(parts);
  const name = new TextEncoder().encode(type);

  const out = new Uint8Array(12 + data.length);

  out.set(u32(data.length), 0);
  out.set(name, 4);
  out.set(data, 8);

  const crc = crc32(concat([name, data]));

  out.set(u32(crc), 8 + data.length);

  return out;
}

function concat(parts) {
  const size = parts.reduce((n, p) => n + p.length, 0);
  const out = new Uint8Array(size);

  let pos = 0;

  for (const p of parts) {
    out.set(p, pos);
    pos += p.length;
  }

  return out;
}

function crc32(data) {
  let crc = 0xffffffff;

  for (const byte of data) {
    crc ^= byte;

    for (let i = 0; i < 8; i++) {
      crc =
        (crc >>> 1) ^
        (crc & 1 ? 0xedb88320 : 0);
    }
  }

  return (crc ^ 0xffffffff) >>> 0;
}
