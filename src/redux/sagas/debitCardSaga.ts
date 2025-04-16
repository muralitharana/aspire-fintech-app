import {call, put, takeEvery} from 'redux-saga/effects';
import {
  addDebitCardDetails,
  getDebitCards,
  patchDebitCard,
  patchDebitCardStatus,
} from '../../services/api';
import {
  addDebitCardApi,
  fetchDebitCardsInformation,
  onFetchDebitCardInfoFailure,
  onFetchDebitCardInfoSuccess,
  onUpdateDebitCardDetailsFailure,
  onUpdateDebitCardDetailsSuccess,
  updateDebitCardStatus,
  updateDebitCardWeeklyLimit,
} from '../slices/DebitCardSlice';
import {DebitCardType} from '../../types/debitCardTypes';

function* workGetDebitcardsFetch() {
  try {
    const debitCards: DebitCardType[] = yield call(getDebitCards);
    const reversed = debitCards.reverse();
    yield put(onFetchDebitCardInfoSuccess(reversed));
  } catch (error) {
    if (error instanceof Error) {
      yield put(onFetchDebitCardInfoFailure(error.message));
    } else {
      yield put(onFetchDebitCardInfoFailure('Unknown error occurred'));
    }
  }
}

function* workUpdateWeeklyLimit(
  action: ReturnType<typeof updateDebitCardWeeklyLimit>,
) {
  try {
    const {cardId, amountLimit, amountSpend} = action.payload;

    // Fetch current card (you could also pass the weeklyLimit directly)
    const card: DebitCardType = yield call(() =>
      patchDebitCard(cardId, {
        weeklyLimit: {
          amountLimit,
          amountSpend,
        },
      }),
    );

    yield put(onUpdateDebitCardDetailsSuccess(card));
  } catch (error: any) {
    yield put(
      onUpdateDebitCardDetailsFailure(
        error?.message || 'Failed to update limit',
      ),
    );
  }
}

function* workUpdateDebitCardStatus(
  action: ReturnType<typeof updateDebitCardStatus>,
) {
  try {
    const {cardId, isFreezed} = action.payload;
    console.log({cardId, isFreezed});
    // Fetch current card (you could also pass the weeklyLimit directly)
    const card: DebitCardType = yield call(() =>
      patchDebitCardStatus(cardId, {
        cardStatus: {
          isFreezed: isFreezed,
        },
      }),
    );

    yield put(onUpdateDebitCardDetailsSuccess(card));
  } catch (error: any) {
    yield put(
      onUpdateDebitCardDetailsFailure(
        error?.message || 'Failed to update limit',
      ),
    );
  }
}

function* addDebitCardSaga(action: ReturnType<typeof addDebitCardApi>) {
  const {debitCard, onSuccess, onFailure} = action.payload;

  try {
    const response: DebitCardType = yield call(() =>
      addDebitCardDetails(debitCard),
    );
    // Optionally dispatch a success action here

    if (onSuccess) {
      yield call(onSuccess, response);
      yield call(workGetDebitcardsFetch); // refetching data
    }
  } catch (error: any) {
    // Optionally dispatch a failure action here
    if (onFailure) {
      yield call(onFailure, error);
    }
  }
}

function* debitCardSaga() {
  yield takeEvery(fetchDebitCardsInformation.type, workGetDebitcardsFetch);
  yield takeEvery(updateDebitCardWeeklyLimit.type, workUpdateWeeklyLimit);
  yield takeEvery(updateDebitCardStatus.type, workUpdateDebitCardStatus);
  yield takeEvery(addDebitCardApi.type, addDebitCardSaga);
}

export default debitCardSaga;
