module.exports = {
	template: function (title, content, bgImage) {
		return `<table>
            <tbody>
                <td>test</td>
            </tbody>
        </table>`;
	},
	signup: function (user, token) {
		const content = "";
		const bgImage = "";
		const title = `Merci ${user.firstname} de nous avoir rejoint !`;
		return module.exports.template(title, content, bgImage);
	},
};
