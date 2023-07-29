import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Select } from 'antd';
import { getDropdownItems } from '@/utils/client/api/ledgerApis';
import useOnFetch from '@/utils/hooks/useOnFetch';
const { Option } = Select;

export default function DPdown({
  entity = 'ledger',
  displayLabels = ['name'],
  searchFields = 'code,name',
  outputValue = 'id',
  value = null,
  options = {},
  handleSelectOnChange = (value = '', index = 0) => { },
  rowkey = 5,
  onChange = (x: any, i?: any) => { }, /// this is for update
}) {
  const [selectOptions, setOptions] = useState([]);
  const [currentValue, setCurrentValue] = useState(undefined);
  const isUpdating = useRef(true);
  const isSearching = useRef(false);
  const [searching, setSearching] = useState(false);
  const [valToSearch, setValToSearch] = useState('');
  const [debouncedValue, setDebouncedValue] = useState('');
  const [comboVal, setComboVal] = useState('');

  let { onFetch, result, isSuccess, isLoading } = useOnFetch();

  const labels = (optionField: any) => {
    return displayLabels.map((x: string) => optionField[x]).join(' ');
  };

  useEffect(() => {
    onFetch(() => getDropdownItems(entity, options));
    // onFetch(() => getDropdownItems(entity, {conditions: JSON.stringify({ rams_syms_id: 2, }), } ));
    // console.log(`selected ISsuccess ${isSuccess}`);
  }, [, options]);

  function handleChange(value: any, index: any) {
    setComboVal(value);
    // console.log(`selected ${rowkey}`);
    handleSelectOnChange(value, rowkey);
    if (onChange && value != undefined) {
      onChange(value[outputValue] || value, index);
      //setDisplayVal(index.children);
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setOptions(result!);
    } else {
      setSearching(false);
      setCurrentValue(undefined);
      setOptions([]);
    }
    // console.log(`selected success ${isSuccess}`);
  }, [isSuccess, result]);

  return (
    <Select
      showSearch
      // value={comboVal}
      onChange={handleChange}
      style={{ width: "100%" }}
      placeholder={'--Please Select--'}
      optionFilterProp="children"
      // filterOption={(input, option) =>  option!.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 || option!.props.value.toString().toLowerCase().indexOf(input.toLowerCase()) >= 0
      filterOption={(input, option) => option!.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
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
