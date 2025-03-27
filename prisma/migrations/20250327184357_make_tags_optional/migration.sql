-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_notas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "conteudo" TEXT NOT NULL,
    "favorita" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT,
    "cor" TEXT,
    "arquivada" BOOLEAN NOT NULL DEFAULT false,
    "criadaEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadaEm" DATETIME NOT NULL
);
INSERT INTO "new_notas" ("atualizadaEm", "conteudo", "cor", "criadaEm", "favorita", "id", "titulo") SELECT "atualizadaEm", "conteudo", "cor", "criadaEm", "favorita", "id", "titulo" FROM "notas";
DROP TABLE "notas";
ALTER TABLE "new_notas" RENAME TO "notas";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
