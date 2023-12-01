function fileLoader() {
    const file = await open("input.txt");
    for await (const line of file.readLines()) {
      console.log("1", line);
    }
}

export fileLoader;