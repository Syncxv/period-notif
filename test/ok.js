SET_ACTIVITY.handler({
    socket: {
        id: 100,
        application: {
            id: "753650777507102840",
            name: "TEST",
        },
        transport: 'ipc',
    },
    args: {
        pid: 10,
        activity: game(),
    }
})
function game() {
    let rp = {
        details: "intersting",
        state: "hehe",
        timestamps: true
            ? {
                    start: Date.now(),
              }
            : undefined,
        assets: {
            // large_image: this.settings.get('large_image', 'powercord'),
            // small_image: this.settings.get('small_image', 'powercord'),
            // large_text: this.settings.get('large_text', undefined) || undefined,
            // small_text: this.settings.get('small_text', undefined) || undefined,
        },
    }
    return rp
}