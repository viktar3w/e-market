import Card from '@/components/shared/common/Card';
import CreateEventCategoryModal from '@/components/shared/support/modal/CreateEventCategoryModal';
import { Button } from '@/components/ui/button';
import { useInsertQuickstartCategoriesMutation } from '@/lib/redux/api/support.api';

type DashboardEmptyStateProps = {};

const DashboardEmptyState = ({}: DashboardEmptyStateProps) => {
  const [insertQuickstartCategories, { isLoading }] = useInsertQuickstartCategoriesMutation();
  return (
    <Card className="flex flex-col items-center justify-center rounded-2xl flex-1 text-center p-6">
      <div className="flex justify-center w-full">
        <img src="/support/brand-asset-wave.png" alt="no categories" className="size-48 -mt-24" />
      </div>
      <h1 className="mt-2 text-xl/8 font-medium tracking-tight text-gray-900">No Event Categories Yet</h1>
      <p className="text-sm/6 text-gray-600 max-w-pose mt-2 mb-8">
        Start tracking events by creating your first category
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
        <Button
          disabled={isLoading}
          variant="outline"
          className="flex items-center space-x-2 w-full sm:w-auto"
          onClick={() => insertQuickstartCategories()}
        >
          <span className="size-5">🚀</span>
          <span>{isLoading ? 'Creating...' : 'Quickstart'}</span>
        </Button>
        <CreateEventCategoryModal containerClassName="w-full sm:w-auto">
          <Button className="flex items-center space-x-2 w-full sm:w-auto">
            <span className="size-5">⭐</span>
            <span>Add Category</span>
          </Button>
        </CreateEventCategoryModal>
      </div>
    </Card>
  );
};

export default DashboardEmptyState;
