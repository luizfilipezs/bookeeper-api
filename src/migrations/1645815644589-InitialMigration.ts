import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1645815644589 implements MigrationInterface {
    name = 'InitialMigration1645815644589'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tag_books_book" ("tagId" uuid NOT NULL, "bookId" uuid NOT NULL, CONSTRAINT "PK_783fac31288ae83e56e920f2b55" PRIMARY KEY ("tagId", "bookId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_779a8085c1f8c8da5938630686" ON "tag_books_book" ("tagId") `);
        await queryRunner.query(`CREATE INDEX "IDX_705950f3c3b0f0bc111adfa76d" ON "tag_books_book" ("bookId") `);
        await queryRunner.query(`ALTER TABLE "tag_books_book" ADD CONSTRAINT "FK_779a8085c1f8c8da5938630686d" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tag_books_book" ADD CONSTRAINT "FK_705950f3c3b0f0bc111adfa76d5" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tag_books_book" DROP CONSTRAINT "FK_705950f3c3b0f0bc111adfa76d5"`);
        await queryRunner.query(`ALTER TABLE "tag_books_book" DROP CONSTRAINT "FK_779a8085c1f8c8da5938630686d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_705950f3c3b0f0bc111adfa76d"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_779a8085c1f8c8da5938630686"`);
        await queryRunner.query(`DROP TABLE "tag_books_book"`);
    }

}
