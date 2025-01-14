// test/vitest.d.ts
import "vitest"

declare global {
  var authorization: {
    tokenClient: string
    tokenUezer: string
  }
}

export {}
