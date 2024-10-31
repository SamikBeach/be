import { Inject, Injectable, LoggerService } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { readdir, unlink } from 'fs/promises';
import { join, parse } from 'path';
import { Repository } from 'typeorm';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AuthorModel } from '@author/entities/author.entity';
import { OriginalWorkModel } from '@original_work/entities/original_work.entity';
import { EditionModel } from '@edition/entities/edition.entity';
import { AuthorCommentModel } from '@author/author_comment/entities/author_comment.entity';
import { EditionCommentModel } from '@edition/edition_comment/entities/edition_comment.entity';
import { OriginalWorkCommentModel } from '@original_work/original_work_comment/entities/original_work_comment.entity';

@Injectable()
export class TasksService {
  // private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(AuthorModel)
    private readonly authorRepository: Repository<AuthorModel>,
    @InjectRepository(OriginalWorkModel)
    private readonly originalWorkRepository: Repository<OriginalWorkModel>,
    @InjectRepository(EditionModel)
    private readonly editionRepository: Repository<EditionModel>,
    @InjectRepository(AuthorCommentModel)
    private readonly authorCommentRepository: Repository<AuthorCommentModel>,
    @InjectRepository(OriginalWorkCommentModel)
    private readonly originalWorkCommentRepository: Repository<OriginalWorkCommentModel>,
    @InjectRepository(EditionCommentModel)
    private readonly editionCommentRepository: Repository<EditionCommentModel>,

    // private readonly logger: DefaultLogger,
    @Inject(WINSTON_MODULE_NEST_PROVIDER)
    private readonly logger: LoggerService
  ) {}

  // @Cron('* * * * * *')
  async eraseOrphanFiles() {
    const files = await readdir(join(process.cwd(), 'public', 'temp'));

    const deleteFilesTargets = files.filter(file => {
      const filename = parse(file).name;

      const split = filename.split('_');

      if (split.length !== 2) {
        return true;
      }

      try {
        const date = +new Date(parseInt(split[split.length - 1]));
        const aDayInMilSec = 24 * 60 * 60 * 1000;

        const now = +new Date();

        return now - date > aDayInMilSec;
      } catch {
        return true;
      }
    });

    await Promise.all(
      deleteFilesTargets.map(x =>
        unlink(join(process.cwd(), 'public', 'temp', x))
      )
    );
  }

  @Cron('0 0 0 * * *')
  async calculateAuthorLikeCount() {
    console.log('--Cron Job Start--');
    await this.authorRepository.query(
      `
UPDATE author
SET like_count = (
    SELECT COUNT(*) 
    FROM author_like 
    WHERE author.id = author_like.author_id
);
`
    );

    await this.authorRepository.query(
      `
UPDATE author
SET comment_count = (
    SELECT COUNT(*) 
    FROM author_comment
    WHERE author.id = author_comment.author_id
);
`
    );

    await this.originalWorkRepository.query(
      `
    UPDATE original_work
    SET like_count = (
        SELECT COUNT(*)
        FROM original_work_like
        WHERE original_work.id = original_work_like.original_work_id
    );
    `
    );

    await this.originalWorkRepository.query(
      `
    UPDATE original_work
    SET comment_count = (
        SELECT COUNT(*)
        FROM original_work_comment
        WHERE original_work.id = original_work_comment.original_work_id
    );
    `
    );

    await this.editionRepository.query(
      `
    UPDATE edition
    SET like_count = (
        SELECT COUNT(*)
        FROM edition_like
        WHERE edition.id = edition_like.edition_id
    );
    `
    );

    await this.authorCommentRepository.query(
      `
    UPDATE author_comment
    SET like_count = (
        SELECT COUNT(*)
        FROM author_comment_like
        WHERE author_comment.id = author_comment_like.author_comment_id
    );
    `
    );

    await this.authorCommentRepository.query(
      `
UPDATE author_comment
SET comment_count = (
    SELECT COUNT(*) 
    FROM (SELECT * FROM author_comment) AS subquery
    WHERE subquery.target_comment_id = author_comment.id
);
    `
    );

    await this.originalWorkCommentRepository.query(
      `
    UPDATE original_work_comment
    SET like_count = (
        SELECT COUNT(*)
        FROM original_work_comment_like
        WHERE original_work_comment.id = original_work_comment_like.original_work_comment_id
    );
    `
    );

    await this.originalWorkCommentRepository.query(
      `
UPDATE original_work_comment
SET comment_count = (
    SELECT COUNT(*)
    FROM (SELECT * FROM original_work_comment) AS subquery
    WHERE subquery.target_comment_id = original_work_comment.id
);
    `
    );

    await this.editionCommentRepository.query(
      `
    UPDATE edition_comment
    SET like_count = (
        SELECT COUNT(*)
        FROM edition_comment_like
        WHERE edition_comment.id = edition_comment_like.edition_comment_id
    );
    `
    );

    await this.editionCommentRepository.query(
      `
UPDATE edition_comment
SET comment_count = (
    SELECT COUNT(*)
    FROM (SELECT * FROM edition_comment) AS subquery
    WHERE subquery.target_comment_id = edition_comment.id
);
    `
    );

    console.log('--Cron Job End--');
  }
}
