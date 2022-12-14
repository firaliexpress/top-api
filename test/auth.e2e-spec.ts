import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Types, disconnect } from 'mongoose';
import { AuthDto } from 'src/auth/dto/auth.dto';

const loginDto: AuthDto = {
	login: 'e2@a.ru',
	password: '1'
};

describe('AuthController (e2e)', () => {
	let app: INestApplication;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();

		// const { body } = await request(app.getHttpServer())
		// 	.post('/auth/login')
		// 	.send(loginDto);
		// token = body.access_token;
	});

	it('/login (POST) - success', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			// .set('Authorization', 'Bearer ' + token)
			.send(loginDto)
			.expect(200)
			.then(({ body: { access_token } }: request.Response) => {
				expect(access_token).toBeDefined();
			});
	});

	it('/login (POST) - fail:password', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			// .set('Authorization', 'Bearer ' + token)
			.send({ ...loginDto, password: '2', })
			.expect(401, {
				statusCode: 401,
				message: 'Введен не верный password',
				error: 'Unauthorized'
			});
	});

	it('/login (POST) - fail:login', async () => {
		return request(app.getHttpServer())
			.post('/auth/login')
			// .set('Authorization', 'Bearer ' + token)
			.send({ ...loginDto, login: 'e2e@a.ru', })
			.expect(401, {
				statusCode: 401,
				message: 'Пользователь с таким email не найден',
				error: 'Unauthorized'
			});
	});

	afterAll(() => {
		disconnect();
	});
});
