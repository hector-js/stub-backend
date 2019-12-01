import { libraries } from "../builder/libraries.template";

export const healthTest = libraries() + `
describe('GET - health ', () => {
	it('should exist', (done) => {
		request(app)
			.get('/health')
			.end((err, res) => {
        expect(err).to.not.exist;
				expect(res.status).to.equal(200);
				expect(res.body).to.deep.equal({
					'STATUS': 'UP'
				});
				done();
			});
	});
});
`;
