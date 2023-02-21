import type {FC} from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import React from 'react';
import {Pressable, Text, useWindowDimensions, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import {useNavigation, useTheme} from '@react-navigation/native';

import type {SaleModel} from '@models/Sale';
import type {AuthenticatedScreenProps} from '@navigation/types';
import {useAppDispatch, useAppSelector} from '@store/redux';
import {setCurrentSale} from '@store/redux/slice/salesSlice';
import database from '@store/watermelon';
import {formatStringDate} from '@utils/date';
import toCurrency from '@utils/toCurrency';

import createStyles from './styles';
import type {SaleCardProps} from './types';

const SaleCard: FC<SaleCardProps> = ({sale_id}) => {
  const [sale, setSale] = useState<SaleModel | null>(null);
  const theme = useTheme();
  const styles = createStyles({theme});

  const {width} = useWindowDimensions();
  const dispatch = useAppDispatch();

  const isSalesman = useAppSelector(
    state => state.user.user?.profile === 'salesman',
  );

  const navigation =
    useNavigation<AuthenticatedScreenProps<'Dashboard'>['navigation']>();

  const onCardPress = () => {
    if (sale) {
      dispatch(setCurrentSale(sale.getData()));
      navigation.navigate('SaleDetails');
    }
  };

  const getSale = async () => {
    const saleItem = await database.collections
      .get<SaleModel>('sales')
      .find(sale_id);

    setSale(saleItem);
  };

  useEffect(() => {
    getSale();
  }, []);

  return (
    <Pressable
      style={[styles.container, {width: width * 0.9}]}
      onPress={onCardPress}>
      <View style={styles.leftContainer}>
        <Text style={styles.value} adjustsFontSizeToFit numberOfLines={1}>
          {toCurrency(sale?.sale_value ?? 0)}
        </Text>
        <View style={{flexDirection: 'row', gap: 10}}>
          {!isSalesman && (
            <View style={styles.rowContainer}>
              <Icon name="account" size={15} color={theme.colors.outline} />
              <Text style={styles.location}>{sale?.salesman}</Text>
            </View>
          )}
          <View style={styles.rowContainer}>
            <Icon name="map-marker" size={15} color={theme.colors.outline} />
            <Text style={styles.location}>
              {sale?.nearest_unit} {sale?.roaming === 1 ? '(R)' : ''}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.rightContainer}>
        <Icon
          name={sale?.synced ? 'cloud-check-outline' : 'cloud-off-outline'}
          size={20}
          color={
            sale?.synced ? theme.colors.onPrimaryContainer : theme.colors.error
          }
        />
        {!!sale?.date_of_sale && (
          <Text style={styles.date}>
            {formatStringDate(sale?.date_of_sale)}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

// const enhance = withObservables(['post'], ({ post }) => ({
//   comments: post.comments.observeWithColumns(['likes'])
// }))

// const EnhancedCommentList = enhance(CommentList)

export default SaleCard;
