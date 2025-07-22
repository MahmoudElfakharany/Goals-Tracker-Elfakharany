export class Goal {
  id!: string;
  title!: string;
  description?: string | null;
  deadline?: Date | null;
  isPublic!: boolean;
  order?: number | null;
  parentId?: string | null;
  children?: Goal[] | null;
  publicId?: string | null;
  ownerId!: string;
  createdAt!: Date;
}
