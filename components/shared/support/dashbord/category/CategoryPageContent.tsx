"use client";

import { EventCategory } from "@prisma/client";
import EmptyCategoryState from "@/components/shared/support/dashbord/category/EmptyCategoryState";

type CategoryPageContentProps = {
  hasEvents: boolean;
  category: EventCategory;
  className?: string;
};

const CategoryPageContent = ({
  hasEvents: initialHasEvents,
  category,
  className,
}: CategoryPageContentProps) => {
  if (!initialHasEvents) {
    return <EmptyCategoryState categoryName={category.name} />;
  }
  return <div className=""></div>;
};

export default CategoryPageContent;
