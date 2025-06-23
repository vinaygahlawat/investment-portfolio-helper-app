/*
  Warnings:

  - You are about to drop the column `stepValues` on the `StepData` table. All the data in the column will be lost.
  - Added the required column `stepValue` to the `StepData` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_StepData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stepValue" INTEGER NOT NULL,
    "stockId" INTEGER NOT NULL,
    CONSTRAINT "StepData_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "Stock" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_StepData" ("createdAt", "date", "id", "stockId") SELECT "createdAt", "date", "id", "stockId" FROM "StepData";
DROP TABLE "StepData";
ALTER TABLE "new_StepData" RENAME TO "StepData";
CREATE UNIQUE INDEX "StepData_date_stockId_key" ON "StepData"("date", "stockId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
