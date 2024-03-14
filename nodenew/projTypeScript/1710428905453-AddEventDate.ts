import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEventDate1710428905453 implements MigrationInterface {
    name = 'AddEventDate1710428905453'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" ADD "date" date NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" DROP COLUMN "date"`);
    }

}
