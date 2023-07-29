import React, { useState, useEffect, useCallback, useRef } from 'react';
import useOnFetch from '@/utils/hooks/useOnFetch';
import { Select } from 'antd';
import { debounce } from "lodash";
import { valueByString } from '@/utils/client/helpers';
// import useDebounce, { debounce } from "@/utils/hooks/use-debounce";
// import { getSearchedLedgers } from '@/utils/client/api/ledgerApis';
import { getSearchedItems } from '@/utils/client/api/ledgerApis';

export default function AutoCompleteAsync({
  entity = 'ledger',
  displayLabels = ['name'],
  searchFields = 'code,name',
  outputValue = 'id',
  value = null, /// this is for update
  onChange = (x: any, i?: any) => { }, /// this is for update
  // onChange,
}) {
  const [selectOptions, setOptions] = useState([]);
  const [currentValue, setCurrentValue] = useState(undefined);
  const isUpdating = useRef(true);
  const isSearching = useRef(false);
  const [searching, setSearching] = useState(false);
  const [valToSearch, setValToSearch] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');

  // setDebouncedValue(useDebounce(valToSearch, 500));
  const debounced = useCallback(
    debounce((val: string) => {
      setDebouncedValue(val);
    }, 700),
    // eslint-disable-next-line
    []
  );

  const asyncSearch = (options: { q: string, fields: string }) => {
    // return request.search({ entity, options });
    return getSearchedItems(entity, options);
  };

  let { onFetch, result, isSuccess, isLoading } = useOnFetch();

  const labels = (optionField: any) => {
    return displayLabels.map((x: string) => optionField[x]).join(' ');
  };

  useEffect(() => {
    if (debouncedValue != '') {
      const options = {
        q: debouncedValue,
        fields: searchFields,
      };
      onFetch(() => asyncSearch(options));
    }
    // console.log('debouncedValue is: ', debouncedValue);
  }, [debouncedValue]);

  const onSearch = (searchText: string) => {
    if (searchText && searchText != '') {
      isSearching.current = true;
      setSearching(true);
      setOptions([]);
      setCurrentValue(undefined);
      setValToSearch(searchText);
      if (valToSearch !== debouncedValue) {
        debounced(searchText);
      }
    }
  };

  useEffect(() => {
    if (isSearching.current) {
      if (isSuccess) {
        setOptions(result!);
      } else {
        setSearching(false);
        setCurrentValue(undefined);
        setOptions([]);
      }
    }
  }, [isSuccess, result]);

  useEffect(() => {
    // this for update Form , it's for setField
    if (value && isUpdating.current) {
      if (!isSearching.current) {
        setOptions([value]);
      }
      setCurrentValue(value[outputValue] || value); // set nested value or value 
      onChange(value[outputValue] || value);
      isUpdating.current = false;
    }
  }, [value]);

  return (
    <Select
      loading={isLoading}
      showSearch
      placeholder={'Search Here'}
      defaultActiveFirstOption={false}
      showArrow={false}
      filterOption={false}
      notFoundContent={searching ? '... Searching' : 'Not Found'}
      value={currentValue}
      onSearch={onSearch}
      onChange={(newValue, index) => {
        if (onChange && newValue != undefined) {
          onChange(newValue[outputValue] || newValue, index);
          //setDisplayVal(index.children);
        }
      }}
      onClear={() => {
        setCurrentValue(undefined);
        setOptions([]);
        onChange('');
      }}
      style={{ width: '100%', marginRight: '1rem' }}
      allowClear
    >
      {selectOptions.map((optionField) => (
        <Select.Option
          key={optionField[outputValue] || optionField}
          value={optionField[outputValue] || optionField}
        >
          {labels(optionField)}
        </Select.Option>
      ))}
    </Select>
  );
}
