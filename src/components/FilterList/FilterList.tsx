import type {FC} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import React from 'react';
import type {ListRenderItemInfo} from 'react-native';
import {FlatList, Pressable, Text, View} from 'react-native';

import {useTheme} from '@react-navigation/native';

import createStyles from './styles';
import type {FilterListProps} from './types';

const FilterList: FC<FilterListProps> = ({
  data = [],
  title,
  onSelectedChange,
  value = null,
}) => {
  const [selectedItem, setSelectedItem] = useState<string | null>(value);
  const theme = useTheme();
  const styles = createStyles({theme});

  useEffect(() => {
    setSelectedItem(value);
  }, [value]);

  const onItemPress = (item: string) => {
    if (selectedItem === item) {
      setSelectedItem(null);
      onSelectedChange(null);
      return;
    }

    setSelectedItem(item);
    onSelectedChange(item);
  };

  const renderItem = ({item}: ListRenderItemInfo<string>) => (
    <Pressable
      style={[
        styles.itemContainer,
        selectedItem === item && styles.itemContainerSelected,
      ]}
      onPress={() => onItemPress(item)}>
      <Text
        style={[
          styles.itemLabel,
          selectedItem === item && styles.itemLabelSelected,
        ]}>
        {item}
      </Text>
    </Pressable>
  );

  const renderSeparator = () => <View style={styles.separator} />;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <FlatList
        horizontal
        data={data}
        renderItem={renderItem}
        ItemSeparatorComponent={renderSeparator}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

export default FilterList;
