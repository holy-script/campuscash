-- CreateTable
CREATE TABLE "Listing" (
    "id" INT8 NOT NULL DEFAULT unique_rowid(),
    "name" STRING NOT NULL,
    "images" STRING[],
    "about" STRING NOT NULL,

    CONSTRAINT "Listing_pkey" PRIMARY KEY ("id")
);
