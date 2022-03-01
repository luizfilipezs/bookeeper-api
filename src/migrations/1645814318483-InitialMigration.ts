import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialMigration1645814318483 implements MigrationInterface {
    name = 'InitialMigration1645814318483'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "collection" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" text NOT NULL, CONSTRAINT "PK_ad3f485bbc99d875491f44d7c85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "publisher" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_70a5936b43177f76161724da3e6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "reading" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bookId" uuid NOT NULL, "volumeNumber" integer NOT NULL, "startDate" date NOT NULL, "endDate" date NOT NULL, CONSTRAINT "PK_f46a902bd4c9624c8b512174944" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "review" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "bookId" uuid NOT NULL, "title" character varying NOT NULL, "content" character varying NOT NULL, CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tag" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, CONSTRAINT "UQ_6a9775008add570dc3e5a0bab7b" UNIQUE ("name"), CONSTRAINT "PK_8e4052373c579afc1471f526760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."book_conservationstate_enum" AS ENUM('new')`);
        await queryRunner.query(`CREATE TABLE "book" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "publisherId" uuid NOT NULL, "title" character varying NOT NULL, "volumeQuantity" integer NOT NULL DEFAULT '1', "conservationState" "public"."book_conservationstate_enum" NOT NULL DEFAULT 'new', "description" text NOT NULL, "year" integer NOT NULL, "language" character varying NOT NULL, "hasBox" boolean NOT NULL DEFAULT false, "dateOfAcquisition" date NOT NULL, "isbn10" character varying(10) NOT NULL, "isbn13" character varying(14) NOT NULL, "dimensions" character varying NOT NULL, CONSTRAINT "PK_a3afef72ec8f80e6e5c310b28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "author" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book_authors_author" ("bookId" uuid NOT NULL, "authorId" uuid NOT NULL, CONSTRAINT "PK_963de00068693ab6e5767de614b" PRIMARY KEY ("bookId", "authorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9bf58ffb2a12a8609a738ee8ca" ON "book_authors_author" ("bookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a4cafdf2ec9974524a5321c751" ON "book_authors_author" ("authorId") `);
        await queryRunner.query(`CREATE TABLE "book_translators_author" ("bookId" uuid NOT NULL, "authorId" uuid NOT NULL, CONSTRAINT "PK_1a417042b6d90b02adb861fe982" PRIMARY KEY ("bookId", "authorId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9d9862b1b6aaac6b230fef04f9" ON "book_translators_author" ("bookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4ff7055734fa5d8799f5c05607" ON "book_translators_author" ("authorId") `);
        await queryRunner.query(`CREATE TABLE "book_tags_tag" ("bookId" uuid NOT NULL, "tagId" uuid NOT NULL, CONSTRAINT "PK_37a9691c5c1ae26b78b47225c72" PRIMARY KEY ("bookId", "tagId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_918a7b7552fe5fd66f328d4fe8" ON "book_tags_tag" ("bookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5274aca0a1468ed55afdfaba24" ON "book_tags_tag" ("tagId") `);
        await queryRunner.query(`CREATE TABLE "book_collections_collection" ("bookId" uuid NOT NULL, "collectionId" uuid NOT NULL, CONSTRAINT "PK_12aadf31d075513ba6404af9da8" PRIMARY KEY ("bookId", "collectionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_37ce06c21329cca9cf1f7fb1fe" ON "book_collections_collection" ("bookId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9f856f86892a824368fa23dd1b" ON "book_collections_collection" ("collectionId") `);
        await queryRunner.query(`ALTER TABLE "reading" ADD CONSTRAINT "FK_cae961c9ec86e2ba48fc7331287" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "review" ADD CONSTRAINT "FK_ae1ec2fd91f77b5df325d1c7b4a" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book" ADD CONSTRAINT "FK_b8988524dd01b5dcb67b4b3ede7" FOREIGN KEY ("publisherId") REFERENCES "publisher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "book_authors_author" ADD CONSTRAINT "FK_9bf58ffb2a12a8609a738ee8cae" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_authors_author" ADD CONSTRAINT "FK_a4cafdf2ec9974524a5321c7516" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_translators_author" ADD CONSTRAINT "FK_9d9862b1b6aaac6b230fef04f96" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_translators_author" ADD CONSTRAINT "FK_4ff7055734fa5d8799f5c056072" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_tags_tag" ADD CONSTRAINT "FK_918a7b7552fe5fd66f328d4fe84" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_tags_tag" ADD CONSTRAINT "FK_5274aca0a1468ed55afdfaba244" FOREIGN KEY ("tagId") REFERENCES "tag"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_collections_collection" ADD CONSTRAINT "FK_37ce06c21329cca9cf1f7fb1fe6" FOREIGN KEY ("bookId") REFERENCES "book"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "book_collections_collection" ADD CONSTRAINT "FK_9f856f86892a824368fa23dd1b2" FOREIGN KEY ("collectionId") REFERENCES "collection"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "book_collections_collection" DROP CONSTRAINT "FK_9f856f86892a824368fa23dd1b2"`);
        await queryRunner.query(`ALTER TABLE "book_collections_collection" DROP CONSTRAINT "FK_37ce06c21329cca9cf1f7fb1fe6"`);
        await queryRunner.query(`ALTER TABLE "book_tags_tag" DROP CONSTRAINT "FK_5274aca0a1468ed55afdfaba244"`);
        await queryRunner.query(`ALTER TABLE "book_tags_tag" DROP CONSTRAINT "FK_918a7b7552fe5fd66f328d4fe84"`);
        await queryRunner.query(`ALTER TABLE "book_translators_author" DROP CONSTRAINT "FK_4ff7055734fa5d8799f5c056072"`);
        await queryRunner.query(`ALTER TABLE "book_translators_author" DROP CONSTRAINT "FK_9d9862b1b6aaac6b230fef04f96"`);
        await queryRunner.query(`ALTER TABLE "book_authors_author" DROP CONSTRAINT "FK_a4cafdf2ec9974524a5321c7516"`);
        await queryRunner.query(`ALTER TABLE "book_authors_author" DROP CONSTRAINT "FK_9bf58ffb2a12a8609a738ee8cae"`);
        await queryRunner.query(`ALTER TABLE "book" DROP CONSTRAINT "FK_b8988524dd01b5dcb67b4b3ede7"`);
        await queryRunner.query(`ALTER TABLE "review" DROP CONSTRAINT "FK_ae1ec2fd91f77b5df325d1c7b4a"`);
        await queryRunner.query(`ALTER TABLE "reading" DROP CONSTRAINT "FK_cae961c9ec86e2ba48fc7331287"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9f856f86892a824368fa23dd1b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_37ce06c21329cca9cf1f7fb1fe"`);
        await queryRunner.query(`DROP TABLE "book_collections_collection"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5274aca0a1468ed55afdfaba24"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_918a7b7552fe5fd66f328d4fe8"`);
        await queryRunner.query(`DROP TABLE "book_tags_tag"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4ff7055734fa5d8799f5c05607"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9d9862b1b6aaac6b230fef04f9"`);
        await queryRunner.query(`DROP TABLE "book_translators_author"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a4cafdf2ec9974524a5321c751"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9bf58ffb2a12a8609a738ee8ca"`);
        await queryRunner.query(`DROP TABLE "book_authors_author"`);
        await queryRunner.query(`DROP TABLE "author"`);
        await queryRunner.query(`DROP TABLE "book"`);
        await queryRunner.query(`DROP TYPE "public"."book_conservationstate_enum"`);
        await queryRunner.query(`DROP TABLE "tag"`);
        await queryRunner.query(`DROP TABLE "review"`);
        await queryRunner.query(`DROP TABLE "reading"`);
        await queryRunner.query(`DROP TABLE "publisher"`);
        await queryRunner.query(`DROP TABLE "collection"`);
    }

}
