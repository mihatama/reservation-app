import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Questionnaire } from '../models'; // ← ご自身のモデル定義パスに合わせて変更
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box
} from '@mui/material';

export default function EditQuestionnairePage() {
  const { questionnaireId } = useParams();
  const navigate = useNavigate();

  // ローディングやデータ取得チェック用
  const [loading, setLoading] = useState(true);
  const [questionnaire, setQuestionnaire] = useState(null);

  // 受診場所
  const [placeOfVisit, setPlaceOfVisit] = useState('');

  // 施設（名称・詳細）
  const [staffName, setStaffName] = useState('');
  const [staffDescription, setStaffDescription] = useState('');

  // ママ情報
  const [mamaLastName, setMamaLastName] = useState('');
  const [mamaFirstName, setMamaFirstName] = useState('');
  const [mamaFuriganaLastName, setMamaFuriganaLastName] = useState('');
  const [mamaFuriganaFirstName, setMamaFuriganaFirstName] = useState('');
  const [mamaBirthYear, setMamaBirthYear] = useState('');
  const [mamaBirthMonth, setMamaBirthMonth] = useState('');
  const [mamaBirthDay, setMamaBirthDay] = useState('');

  // お子様情報
  const [childLastName, setChildLastName] = useState('');
  const [childFirstName, setChildFirstName] = useState('');
  const [childFuriganaLastName, setChildFuriganaLastName] = useState('');
  const [childFuriganaFirstName, setChildFuriganaFirstName] = useState('');
  const [childBirthYear, setChildBirthYear] = useState('');
  const [childBirthMonth, setChildBirthMonth] = useState('');
  const [childBirthDay, setChildBirthDay] = useState('');
  const [childOrder, setChildOrder] = useState('');
  const [childSex, setChildSex] = useState('');

  // お仕事・ご住所
  const [occupation, setOccupation] = useState('');
  const [postpartumStatus, setPostpartumStatus] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [homePostalCode, setHomePostalCode] = useState('');
  const [rikaeriAddress, setRikaeriAddress] = useState('');
  const [rikaeriPostalCode, setRikaeriPostalCode] = useState('');

  // 出産の状況
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [deliveryWeek, setDeliveryWeek] = useState('');
  const [birthWeight, setBirthWeight] = useState('');
  const [dischargeWeight, setDischargeWeight] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [measurement1Date, setMeasurement1Date] = useState('');
  const [measurement1, setMeasurement1] = useState('');
  const [measurement2Date, setMeasurement2Date] = useState('');
  const [measurement2, setMeasurement2] = useState('');

  // 妊娠時・医療歴
  const [pregnancyCondition, setPregnancyCondition] = useState('');
  const [pastMedicalHistory, setPastMedicalHistory] = useState('');
  const [medication, setMedication] = useState('');
  const [infectionHistory, setInfectionHistory] = useState('');
  const [familyHistory, setFamilyHistory] = useState('');

  // ご来院理由
  const [visitReason, setVisitReason] = useState('');

  // その他
  const [additionalNotes, setAdditionalNotes] = useState('');

  // ===== データ取得 =====
  useEffect(() => {
    const fetchQuestionnaire = async () => {
      try {
        setLoading(true);
        const result = await DataStore.query(Questionnaire, questionnaireId);
        if (result) {
          setQuestionnaire(result);

          // 受診場所
          setPlaceOfVisit(result.placeOfVisit || '');

          // 施設
          setStaffName(result.staffName || '');
          setStaffDescription(result.staffDescription || '');

          // ママ情報
          setMamaLastName(result.mamaLastName || '');
          setMamaFirstName(result.mamaFirstName || '');
          setMamaFuriganaLastName(result.mamaFuriganaLastName || '');
          setMamaFuriganaFirstName(result.mamaFuriganaFirstName || '');
          setMamaBirthYear(result.mamaBirthYear || '');
          setMamaBirthMonth(result.mamaBirthMonth || '');
          setMamaBirthDay(result.mamaBirthDay || '');

          // お子様情報
          setChildLastName(result.childLastName || '');
          setChildFirstName(result.childFirstName || '');
          setChildFuriganaLastName(result.childFuriganaLastName || '');
          setChildFuriganaFirstName(result.childFuriganaFirstName || '');
          setChildBirthYear(result.childBirthYear || '');
          setChildBirthMonth(result.childBirthMonth || '');
          setChildBirthDay(result.childBirthDay || '');
          setChildOrder(result.childOrder || '');
          setChildSex(result.childSex || '');

          // お仕事・ご住所
          setOccupation(result.occupation || '');
          setPostpartumStatus(result.postpartumStatus || '');
          setHomeAddress(result.homeAddress || '');
          setHomePostalCode(result.homePostalCode || '');
          setRikaeriAddress(result.rikaeriAddress || '');
          setRikaeriPostalCode(result.rikaeriPostalCode || '');

          // 出産の状況
          setDeliveryMethod(result.deliveryMethod || '');
          setDeliveryWeek(result.deliveryWeek || '');
          setBirthWeight(result.birthWeight || '');
          setDischargeWeight(result.dischargeWeight || '');
          setDischargeDate(result.dischargeDate || '');
          setMeasurement1Date(result.measurement1Date || '');
          setMeasurement1(result.measurement1 || '');
          setMeasurement2Date(result.measurement2Date || '');
          setMeasurement2(result.measurement2 || '');

          // 妊娠時・医療歴
          setPregnancyCondition(result.pregnancyCondition || '');
          setPastMedicalHistory(result.pastMedicalHistory || '');
          setMedication(result.medication || '');
          setInfectionHistory(result.infectionHistory || '');
          setFamilyHistory(result.familyHistory || '');

          // ご来院理由
          setVisitReason(result.visitReason || '');

          // その他
          setAdditionalNotes(result.additionalNotes || '');
        }
      } catch (err) {
        console.error('Error fetching questionnaire:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestionnaire();
  }, [questionnaireId]);

  // ===== 保存処理 =====
  const handleSave = async () => {
    if (!questionnaire) return;
    try {
      await DataStore.save(
        Questionnaire.copyOf(questionnaire, (updated) => {
          // 受診場所
          updated.placeOfVisit = placeOfVisit;

          // 施設
          updated.staffName = staffName;
          updated.staffDescription = staffDescription;

          // ママ情報
          updated.mamaLastName = mamaLastName;
          updated.mamaFirstName = mamaFirstName;
          updated.mamaFuriganaLastName = mamaFuriganaLastName;
          updated.mamaFuriganaFirstName = mamaFuriganaFirstName;
          updated.mamaBirthYear = mamaBirthYear;
          updated.mamaBirthMonth = mamaBirthMonth;
          updated.mamaBirthDay = mamaBirthDay;

          // お子様情報
          updated.childLastName = childLastName;
          updated.childFirstName = childFirstName;
          updated.childFuriganaLastName = childFuriganaLastName;
          updated.childFuriganaFirstName = childFuriganaFirstName;
          updated.childBirthYear = childBirthYear;
          updated.childBirthMonth = childBirthMonth;
          updated.childBirthDay = childBirthDay;
          updated.childOrder = childOrder;
          updated.childSex = childSex;

          // お仕事・ご住所
          updated.occupation = occupation;
          updated.postpartumStatus = postpartumStatus;
          updated.homeAddress = homeAddress;
          updated.homePostalCode = homePostalCode;
          updated.rikaeriAddress = rikaeriAddress;
          updated.rikaeriPostalCode = rikaeriPostalCode;

          // 出産の状況
          updated.deliveryMethod = deliveryMethod;
          updated.deliveryWeek = deliveryWeek;
          updated.birthWeight = birthWeight;
          updated.dischargeWeight = dischargeWeight;
          updated.dischargeDate = dischargeDate;
          updated.measurement1Date = measurement1Date;
          updated.measurement1 = measurement1;
          updated.measurement2Date = measurement2Date;
          updated.measurement2 = measurement2;

          // 妊娠時・医療歴
          updated.pregnancyCondition = pregnancyCondition;
          updated.pastMedicalHistory = pastMedicalHistory;
          updated.medication = medication;
          updated.infectionHistory = infectionHistory;
          updated.familyHistory = familyHistory;

          // ご来院理由
          updated.visitReason = visitReason;

          // その他
          updated.additionalNotes = additionalNotes;
        })
      );
      alert('問診票を更新しました。');
      // 保存後、一覧ページへ戻るなど
      navigate('/admin/questionnaires');
    } catch (err) {
      console.error('Error updating questionnaire:', err);
      alert('更新に失敗しました。');
    }
  };

  if (loading) {
    return <Box sx={{ p: 2 }}>読み込み中...</Box>;
  }

  if (!questionnaire) {
    return <Box sx={{ p: 2 }}>該当の問診票が見つかりませんでした。</Box>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          問診票 修正ページ
        </Typography>

        {/** 受診場所 */}
        <Typography variant="h6" sx={{ mt: 2 }}>受診場所</Typography>
        <TextField
          label="受診場所"
          value={placeOfVisit}
          onChange={(e) => setPlaceOfVisit(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/** 施設 */}
        <Typography variant="h6" sx={{ mt: 2 }}>施設</Typography>
        <TextField
          label="施設名"
          value={staffName}
          onChange={(e) => setStaffName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="施設の詳細"
          value={staffDescription}
          onChange={(e) => setStaffDescription(e.target.value)}
          fullWidth
          multiline
          margin="normal"
        />

        {/** ママ情報 */}
        <Typography variant="h6" sx={{ mt: 2 }}>ママ情報</Typography>
        <TextField
          label="姓(漢字)"
          value={mamaLastName}
          onChange={(e) => setMamaLastName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="名(漢字)"
          value={mamaFirstName}
          onChange={(e) => setMamaFirstName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="姓(フリガナ)"
          value={mamaFuriganaLastName}
          onChange={(e) => setMamaFuriganaLastName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="名(フリガナ)"
          value={mamaFuriganaFirstName}
          onChange={(e) => setMamaFuriganaFirstName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="生年"
            value={mamaBirthYear}
            onChange={(e) => setMamaBirthYear(e.target.value)}
            margin="normal"
          />
          <TextField
            label="月"
            value={mamaBirthMonth}
            onChange={(e) => setMamaBirthMonth(e.target.value)}
            margin="normal"
          />
          <TextField
            label="日"
            value={mamaBirthDay}
            onChange={(e) => setMamaBirthDay(e.target.value)}
            margin="normal"
          />
        </Box>

        {/** お子様情報 */}
        <Typography variant="h6" sx={{ mt: 2 }}>お子様情報</Typography>
        <TextField
          label="姓(漢字)"
          value={childLastName}
          onChange={(e) => setChildLastName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="名(漢字)"
          value={childFirstName}
          onChange={(e) => setChildFirstName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="姓(フリガナ)"
          value={childFuriganaLastName}
          onChange={(e) => setChildFuriganaLastName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="名(フリガナ)"
          value={childFuriganaFirstName}
          onChange={(e) => setChildFuriganaFirstName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            label="生年"
            value={childBirthYear}
            onChange={(e) => setChildBirthYear(e.target.value)}
            margin="normal"
          />
          <TextField
            label="月"
            value={childBirthMonth}
            onChange={(e) => setChildBirthMonth(e.target.value)}
            margin="normal"
          />
          <TextField
            label="日"
            value={childBirthDay}
            onChange={(e) => setChildBirthDay(e.target.value)}
            margin="normal"
          />
        </Box>
        <TextField
          label="第何子"
          value={childOrder}
          onChange={(e) => setChildOrder(e.target.value)}
          margin="normal"
        />
        <TextField
          label="性別"
          value={childSex}
          onChange={(e) => setChildSex(e.target.value)}
          margin="normal"
        />

        {/** お仕事・ご住所 */}
        <Typography variant="h6" sx={{ mt: 2 }}>お仕事・ご住所</Typography>
        <TextField
          label="お仕事"
          value={occupation}
          onChange={(e) => setOccupation(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="産後状況"
          value={postpartumStatus}
          onChange={(e) => setPostpartumStatus(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="自宅住所"
          value={homeAddress}
          onChange={(e) => setHomeAddress(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="自宅住所 郵便番号"
          value={homePostalCode}
          onChange={(e) => setHomePostalCode(e.target.value)}
          margin="normal"
        />
        <TextField
          label="里帰り先住所"
          value={rikaeriAddress}
          onChange={(e) => setRikaeriAddress(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="里帰り先 郵便番号"
          value={rikaeriPostalCode}
          onChange={(e) => setRikaeriPostalCode(e.target.value)}
          margin="normal"
        />

        {/** 出産の状況 */}
        <Typography variant="h6" sx={{ mt: 2 }}>出産の状況</Typography>
        <TextField
          label="出産方法"
          value={deliveryMethod}
          onChange={(e) => setDeliveryMethod(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="出産週"
          value={deliveryWeek}
          onChange={(e) => setDeliveryWeek(e.target.value)}
          margin="normal"
        />
        <TextField
          label="出生体重"
          value={birthWeight}
          onChange={(e) => setBirthWeight(e.target.value)}
          margin="normal"
        />
        <TextField
          label="退院体重"
          value={dischargeWeight}
          onChange={(e) => setDischargeWeight(e.target.value)}
          margin="normal"
        />
        <TextField
          label="退院日"
          value={dischargeDate}
          onChange={(e) => setDischargeDate(e.target.value)}
          margin="normal"
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <TextField
            label="測定1 日付"
            value={measurement1Date}
            onChange={(e) => setMeasurement1Date(e.target.value)}
          />
          <TextField
            label="測定1 内容"
            value={measurement1}
            onChange={(e) => setMeasurement1(e.target.value)}
          />
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mt: 1 }}>
          <TextField
            label="測定2 日付"
            value={measurement2Date}
            onChange={(e) => setMeasurement2Date(e.target.value)}
          />
          <TextField
            label="測定2 内容"
            value={measurement2}
            onChange={(e) => setMeasurement2(e.target.value)}
          />
        </Box>

        {/** 妊娠時・医療歴 */}
        <Typography variant="h6" sx={{ mt: 2 }}>妊娠時・医療歴</Typography>
        <TextField
          label="妊娠時の状況"
          value={pregnancyCondition}
          onChange={(e) => setPregnancyCondition(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="病歴"
          value={pastMedicalHistory}
          onChange={(e) => setPastMedicalHistory(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="内服薬"
          value={medication}
          onChange={(e) => setMedication(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="感染症既往"
          value={infectionHistory}
          onChange={(e) => setInfectionHistory(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="家族相関"
          value={familyHistory}
          onChange={(e) => setFamilyHistory(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/** ご来院理由 */}
        <Typography variant="h6" sx={{ mt: 2 }}>ご来院理由</Typography>
        <TextField
          label="ご来院理由"
          value={visitReason}
          onChange={(e) => setVisitReason(e.target.value)}
          fullWidth
          margin="normal"
        />

        {/** その他 */}
        <Typography variant="h6" sx={{ mt: 2 }}>その他</Typography>
        <TextField
          label="その他"
          value={additionalNotes}
          onChange={(e) => setAdditionalNotes(e.target.value)}
          fullWidth
          multiline
          minRows={2}
          margin="normal"
        />

        <Box sx={{ textAlign: 'right', mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSave}
          >
            保存
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
