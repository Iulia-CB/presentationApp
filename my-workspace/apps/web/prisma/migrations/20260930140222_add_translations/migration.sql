-- CreateTable
CREATE TABLE "translations" (
    "id" TEXT NOT NULL,
    "namespace" TEXT NOT NULL,
    "locale" TEXT NOT NULL,
    "content" JSONB NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "translations_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "translations_namespace_locale_key" ON "translations"("namespace", "locale");
