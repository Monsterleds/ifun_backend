import { MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateLikes1594735817581 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'like',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    isPrimary: true,
                    generationStrategy: 'uuid',
                    default: 'uuid_generate_v4()'
                },
                {
                    name: 'id_post',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'id_user',
                    type: 'varchar',
                    isNullable: false,
                }
            ], 
            foreignKeys: [{
                name: 'fk_likes_posts',
                columnNames: ['id_post'],
                referencedTableName: 'posts',
                referencedColumnNames: ['id'],
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('like');
    }

}
