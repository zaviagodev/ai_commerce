import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { CustomerGroupService } from '../services/customer-group-service';
import { CustomerGroup } from '@/types/customer';

export function useCustomerGroups() {
  const queryClient = useQueryClient();

  const {
    data: groups = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['customer-groups'],
    queryFn: CustomerGroupService.getGroups,
  });

  const createGroup = useMutation({
    mutationFn: (group: Omit<CustomerGroup, 'id'>) =>
      CustomerGroupService.createGroup(group),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-groups'] });
    },
  });

  const updateGroup = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CustomerGroup> }) =>
      CustomerGroupService.updateGroup(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-groups'] });
    },
  });

  const deleteGroup = useMutation({
    mutationFn: CustomerGroupService.deleteGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer-groups'] });
    },
  });

  return {
    groups,
    isLoading,
    error,
    createGroup,
    updateGroup,
    deleteGroup,
  };
}