-- CreateTable
CREATE TABLE "appointments" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "surname" VARCHAR,
    "mail" VARCHAR,
    "phone" INTEGER,
    "date" TIMESTAMP(6),
    "cost" INTEGER,
    "time" INTEGER,
    "services_id" INTEGER[],
    "worker_id" INTEGER,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "services" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "price" INTEGER,
    "time" INTEGER,
    "category" VARCHAR,

    CONSTRAINT "prices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "workers" (
    "id" SERIAL NOT NULL,
    "categories" VARCHAR[],
    "name" VARCHAR,

    CONSTRAINT "workers_pkey" PRIMARY KEY ("id")
);
