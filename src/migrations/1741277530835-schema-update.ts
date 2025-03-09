import { MigrationInterface, QueryRunner } from "typeorm";

export class SchemaUpdate1741277530835 implements MigrationInterface {
  name = "SchemaUpdate1741277530835";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` ADD \`country_code\` varchar(255) NULL`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`user\` DROP COLUMN \`country_code\``
    );
  }
}
