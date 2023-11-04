/* eslint-disable prettier/prettier */
import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
    
    // esse código abaixo fica disponível na documentação do Nest e do Prisma

    async onModuleInit() {
        await this.$connect();
    }

    async enableShutdownHooks(app: INestApplication) {
        process.on('beforeExit', async () => {
            await app.close();
        })
    }

    /* Essa é a solução recomendada pela documentação tanto do prisma quanto do NestJS.

https://www.prisma.io/docs/guides/upgrade-guides/upgrading-versions/upgrading-to-prisma-5#removal-of-the-beforeexit-hook-from-the-library-engine

https://docs.nestjs.com/fundamentals/lifecycle-events#application-shutdown */

}
