import {call, put, takeEvery} from 'redux-saga/effects';
import {
  getDebitCards,
  patchDebitCard,
  patchDebitCardStatus,
} from '../../services/api';
import {
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
    console.log('Fetching debit cards...');
    const debitCards: DebitCardType[] = yield call(getDebitCards);
    yield put(onFetchDebitCardInfoSuccess(debitCards));
  } catch (error) {
    console.warn('Debit card fetch failed:', error);
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

function* debitCardSaga() {
  console.log('Debit card saga initialized');
  yield takeEvery(fetchDebitCardsInformation.type, workGetDebitcardsFetch);
  yield takeEvery(updateDebitCardWeeklyLimit.type, workUpdateWeeklyLimit);
  yield takeEvery(updateDebitCardStatus.type, workUpdateDebitCardStatus);
}

export default debitCardSaga;
