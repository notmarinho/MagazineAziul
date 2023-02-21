import type {ForwardRefRenderFunction} from 'react';
import React, {forwardRef, useCallback, useMemo} from 'react';

import type {BottomSheetBackdropProps} from '@gorhom/bottom-sheet';
import BottomSheet, {BottomSheetBackdrop} from '@gorhom/bottom-sheet';
import type {FilterSalesParams} from '@services/types';

import FilterContent from './components/FilterContent';

interface FilterBottomSheetProps {
  onFilter: (filterParams: FilterSalesParams) => void;
}

const FilterBottomSheet: ForwardRefRenderFunction<
  BottomSheet,
  FilterBottomSheetProps
> = ({onFilter}, ref) => {
  const snapPoints = useMemo(() => ['80%'], []);

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [],
  );

  return (
    <BottomSheet
      ref={ref}
      snapPoints={snapPoints}
      index={-1}
      backdropComponent={renderBackdrop}
      enablePanDownToClose>
      <FilterContent onFilter={onFilter} />
    </BottomSheet>
  );
};

export default forwardRef(FilterBottomSheet);
