export async function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      console.log("Processing order...");
      resolve();
    }, ms);
  });
}
