import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    await prisma.storage.createMany({
        data: [
            {
                // id: 1
                name: 'Основной склад',
                address: 'г. Пенза ул. Проспект Строителей',
            },
            {
                // id: 2
                name: 'Кантри 1.2',
                address: 'г. Пенза ул. Гагарина д.12',
            },
            {
                // id: 3
                name: 'Кантри 1.7',
                address: 'г. Пенза ул. Гагарина д.14',
            },
            {
                // id: 4
                name: 'Лугометрия 8',
                address: 'г. Пенза ул. Пушкина д.10',
            },
            {
                // id: 5
                name: 'Норвуд',
                address: 'г. Пенза ул. Измайлова д.15',
            },
        ],
    });

    await prisma.transportCompany.createMany({
        data: [
            {
                // id: 1,
                name: 'СДЭК',
                address: 'г. Пенза ул. Проспект Строителей',
            },
            {
                // id: 2,
                name: 'ПЭК',
                address: 'г. Пенза ул. Гагарина д.12',
            },
            {
                // id: 3,
                name: 'Мега',
                address: 'г. Пенза ул. Гагарина д.14',
            },
            {
                // id: 4,
                name: 'Россия 1',
                address: 'г. Пенза ул. Пушкина д.10',
            },
            {
                // id: 5,
                name: 'Россия 2',
                address: 'г. Пенза ул. Измайлова д.15',
            },
        ],
    });

    await prisma.providers.createMany({
        data: [
            {
                // id: 1
                name: 'ООО "Рога и копыта"',
                address: 'г. Пенза ул. Проспект Строителей',
            },
            {
                // id: 2
                name: 'ООО "Поставщик"',
                address: 'г. Пенза ул. Гагарина д.89',
            },
            {
                // id: 3
                name: 'ООО "Поставщик 12"',
                address: 'г. Пенза ул. Гагарина д.12',
            },
            {
                // id: 4
                name: 'ООО "Поставщик 13"',
                address: 'г. Пенза ул. Гагарина д.13',
            },
            {
                // id: 5
                name: 'ООО "Поставщик 14"',
                address: 'г. Пенза ул. Гагарина д.14',
            },
        ],
    });

    await prisma.transportCompanyToProvider.createMany({
        data: [
            {
                providersId: 1,
                transportCompanyId: 1,
                default: true,
            },
            {
                providersId: 2,
                transportCompanyId: 2,
                default: false,
            },
        ],
    });
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
