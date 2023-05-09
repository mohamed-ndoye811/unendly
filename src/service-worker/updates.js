async function showNotification(
    test
) {
    await self.registration.showNotification(test ?? '', {
        body: `A new video was added to '${test}'`,
        tag: `https://youtu.be/${test}`,
    });
}

export async function checkForUpdates() {
    await showNotification("Test");
}