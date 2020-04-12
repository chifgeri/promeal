import React, {useState, useEffect} from 'react';
import {searchFood} from '../../../core/network/mealQuery';
import BaseInput from '../../../core/components/BaseInput';
import {View} from 'react-native';
import {CancelTokenSource} from 'axios';
import {Ingredient} from 'src/data/ingredient.dto';
import IngredientList from './IngredientList';

interface Props {
  addIngredient: (i: Ingredient) => void;
}

const IngredientSearch = (props: Props) => {
  const [text, setText] = useState<string>('');
  const [cancel, setCancel] = useState<CancelTokenSource | null>(null);
  const [data, setData] = useState<Ingredient[] | null | undefined>(null);
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    if (cancel) {
      cancel.cancel();
    }
    const call = searchFood(text);
    setCancel(call.source);
    // useEffect can not be async so need a callable function
    const performCall = async () => {
      const response = await call.request();
      setData(response);
    };
    performCall();
  }, [text]);

  useEffect(() => {
    if (data) {
      setCancel(null);
    }
  }, [data]);

  return (
    <View>
      <BaseInput
        onChangeText={t => {
          setText(t);
        }}
        value={text}
        onFocus={() => setShowList(true)}
      />
      {data && text.length > 0 && showList && (
        <IngredientList
          ingredients={data}
          setIngredient={i => {
            props.addIngredient(i);
            setText(i.name);
            setShowList(false);
          }}
        />
      )}
    </View>
  );
};

export default IngredientSearch;
