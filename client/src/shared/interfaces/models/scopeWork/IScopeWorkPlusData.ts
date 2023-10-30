export interface IScopeWorkPlusData {
    id: number;
    deletedAt: string | null;
    typeWorkId: number;
    objectId: number;
    createdAt: string;
    updatedAt: string;
    mainCount: number;
    countTableAddingData: number;
    percentAll: string;
    countUser: number;
    percentOneUserForTotalVolume: string;
    percentOneUserCompletedVolume: string;
}
