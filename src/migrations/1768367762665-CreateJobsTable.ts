import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateJobsTable1768367762665 implements MigrationInterface {
    name = 'CreateJobsTable1768367762665'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "jobs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "fileName" character varying(255) NOT NULL, "fileSize" bigint NOT NULL, "fileType" character varying NOT NULL, "status" character varying NOT NULL DEFAULT 'PENDING', "progress" integer NOT NULL DEFAULT '0', "result" jsonb, "callbackUrl" character varying, "errorMessage" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cf0a6c42b72fcc7f7c237def345" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_08fe8d675aa41ad0e9d5bdc3e9" ON "jobs" ("fileType") `);
        await queryRunner.query(`CREATE INDEX "IDX_a0c30e3eb9649fe7fbcd336a63" ON "jobs" ("status") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_a0c30e3eb9649fe7fbcd336a63"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_08fe8d675aa41ad0e9d5bdc3e9"`);
        await queryRunner.query(`DROP TABLE "jobs"`);
    }

}
