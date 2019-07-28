module.exports = {
    validate(client, message) {
		if (!message.member.hasPermission('MANAGE_GUILD')) {
			throw new Error('no_permission');
		}
	},
    async run(client, message, args) {
        message.delete();
        message.channel.send('Hello.')
    },
    get command() {
        return {
            name: 'test',
			category: 'USER',
			description: 'command test',
			usage: 'test',
        }
    }
}