import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { DataStore } from '@aws-amplify/datastore';
import { Questionnaire, Reservation } from '../models';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Grid
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { fetchAuthSession } from '@aws-amplify/auth';

export default function QuestionnaireFormPage() {
  const { reservationId } = useParams();
  const navigate = useNavigate();
  const [reservation, setReservation] = useState(null);

  // ママ情報
  const [mamaLastName, setMamaLastName] = useState('');
  const [mamaFirstName, setMamaFirstName] = useState('');
  const [mamaFuriganaLastName, setMamaFuriganaLastName] = useState('');
  const [mamaFuriganaFirstName, setMamaFuriganaFirstName] = useState('');
  const [mamaBirthYear, setMamaBirthYear] = useState('');
  const [mamaBirthMonth, setMamaBirthMonth] = useState('');
  const [mamaBirthDay, setMamaBirthDay] = useState('');

  // 受診場所
  const [placeOfVisit, setPlaceOfVisit] = useState('');

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
  const [homePostalCode, setHomePostalCode] = useState('');
  const [homeAddress, setHomeAddress] = useState('');
  const [rikaeriPostalCode, setRikaeriPostalCode] = useState('');
  const [rikaeriAddress, setRikaeriAddress] = useState('');

  // 出産状況・体重
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [deliveryWeek, setDeliveryWeek] = useState('');
  const [birthWeight, setBirthWeight] = useState('');
  const [dischargeWeight, setDischargeWeight] = useState('');
  const [dischargeDate, setDischargeDate] = useState(null);
  const [measurement1Date, setMeasurement1Date] = useState(null);
  const [measurement1, setMeasurement1] = useState('');
  const [measurement2Date, setMeasurement2Date] = useState(null);
  const [measurement2, setMeasurement2] = useState('');

  // 妊娠時・医療歴
  const [pregnancyCondition, setPregnancyCondition] = useState('');
  const [pastMedicalHistory, setPastMedicalHistory] = useState('');
  const [medication, setMedication] = useState('');
  const [infectionHistory, setInfectionHistory] = useState('');

  // その他
  const [familyHistory, setFamilyHistory] = useState('');
  const [visitReason, setVisitReason] = useState([]); // 複数選択は配列で管理
  const [additionalNotes, setAdditionalNotes] = useState('');

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const session = await fetchAuthSession();
        const payload = session.tokens.idToken.payload;
        if (payload.family_name) setMamaLastName(payload.family_name);
        if (payload.given_name) setMamaFirstName(payload.given_name);
      } catch (err) {
        console.error("Auth セッションの取得に失敗", err);
      }
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    const fetchReservation = async () => {
      try {
        const res = await DataStore.query(Reservation, reservationId);
        setReservation(res);
      } catch (err) {
        console.error("予約情報の取得に失敗", err);
      }
    };
    if (reservationId) {
      fetchReservation();
    }
  }, [reservationId]);

  const handleVisitReasonChange = (reason) => {
    setVisitReason(prev => {
      if (prev.includes(reason)) {
        return prev.filter(r => r !== reason);
      } else {
        return [...prev, reason];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await DataStore.save(new Questionnaire({
        reservationID: reservationId,
        placeOfVisit,
        mamaLastName,
        mamaFirstName,
        mamaFuriganaLastName,
        mamaFuriganaFirstName,
        mamaBirthYear,
        mamaBirthMonth,
        mamaBirthDay,
        childLastName,
        childFirstName,
        childFuriganaLastName,
        childFuriganaFirstName,
        childBirthYear,
        childBirthMonth,
        childBirthDay,
        childOrder,
        childSex,
        occupation,
        postpartumStatus,
        homePostalCode,
        homeAddress,
        rikaeriPostalCode,
        rikaeriAddress,
        deliveryMethod,
        deliveryWeek,
        birthWeight,
        dischargeWeight,
        dischargeDate: dischargeDate ? dischargeDate.format('YYYY-MM-DD') : '',
        measurement1Date: measurement1Date ? measurement1Date.format('YYYY-MM-DD') : '',
        measurement1,
        measurement2Date: measurement2Date ? measurement2Date.format('YYYY-MM-DD') : '',
        measurement2,
        pregnancyCondition,
        pastMedicalHistory,
        medication,
        infectionHistory,
        familyHistory,
        visitReason: visitReason.join(','),
        additionalNotes
      }));
      alert('問診票を送信しました。');
      navigate('/my-reservations');
    } catch (err) {
      console.error("問診票の保存に失敗", err);
      alert("問診票の送信に失敗しました。");
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>問診票入力</Typography>
        {reservation && (
          <Typography variant="body1" gutterBottom>
            予約日: {reservation.date} {dayjs(reservation.startTime).format('HH:mm')} - {dayjs(reservation.endTime).format('HH:mm')}
          </Typography>
        )}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {/* 受診場所 */}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">受診場所 *</FormLabel>
                <RadioGroup row value={placeOfVisit} onChange={(e) => setPlaceOfVisit(e.target.value)}>
                  {["西宮", "宝塚", "日本橋", "愛知", "訪問"].map(place => (
                    <FormControlLabel key={place} value={place} control={<Radio />} label={place} />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* ママ情報 */}
            <Grid item xs={12}>
              <Typography variant="h6">ママ情報</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField label="姓（漢字） *" value={mamaLastName} onChange={(e) => setMamaLastName(e.target.value)} fullWidth placeholder="例）山田" required />
            </Grid>
            <Grid item xs={6}>
              <TextField label="名（漢字） *" value={mamaFirstName} onChange={(e) => setMamaFirstName(e.target.value)} fullWidth placeholder="例）花子" required />
            </Grid>
            <Grid item xs={6}>
              <TextField label="ふりがな（姓）" value={mamaFuriganaLastName} onChange={(e) => setMamaFuriganaLastName(e.target.value)} fullWidth placeholder="例）やまだ" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="ふりがな（名）" value={mamaFuriganaFirstName} onChange={(e) => setMamaFuriganaFirstName(e.target.value)} fullWidth placeholder="例）はなこ" />
            </Grid>
            <Grid item xs={4}>
              <TextField label="生年(西暦) *" value={mamaBirthYear} onChange={(e) => setMamaBirthYear(e.target.value)} fullWidth placeholder="例）1988" required />
            </Grid>
            <Grid item xs={4}>
              <TextField label="月 *" value={mamaBirthMonth} onChange={(e) => setMamaBirthMonth(e.target.value)} fullWidth placeholder="例）12" required />
            </Grid>
            <Grid item xs={4}>
              <TextField label="日 *" value={mamaBirthDay} onChange={(e) => setMamaBirthDay(e.target.value)} fullWidth placeholder="例）24" required />
            </Grid>

            {/* お子様情報 */}
            <Grid item xs={12}>
              <Typography variant="h6">お子様情報</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField label="姓（漢字）" value={childLastName} onChange={(e) => setChildLastName(e.target.value)} fullWidth placeholder="例）山田" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="名（漢字）" value={childFirstName} onChange={(e) => setChildFirstName(e.target.value)} fullWidth placeholder="例）太郎" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="ふりがな（姓）" value={childFuriganaLastName} onChange={(e) => setChildFuriganaLastName(e.target.value)} fullWidth placeholder="例）やまだ" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="ふりがな（名）" value={childFuriganaFirstName} onChange={(e) => setChildFuriganaFirstName(e.target.value)} fullWidth placeholder="例）たろう" />
            </Grid>
            <Grid item xs={4}>
              <TextField label="生年(西暦)" value={childBirthYear} onChange={(e) => setChildBirthYear(e.target.value)} fullWidth placeholder="例）2023" />
            </Grid>
            <Grid item xs={4}>
              <TextField label="月" value={childBirthMonth} onChange={(e) => setChildBirthMonth(e.target.value)} fullWidth placeholder="例）1" />
            </Grid>
            <Grid item xs={4}>
              <TextField label="日" value={childBirthDay} onChange={(e) => setChildBirthDay(e.target.value)} fullWidth placeholder="例）15" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="第( )子" value={childOrder} onChange={(e) => setChildOrder(e.target.value)} fullWidth placeholder="例）1" />
            </Grid>
            <Grid item xs={6}>
              <FormControl component="fieldset">
                <FormLabel component="legend">お子様の性別</FormLabel>
                <RadioGroup row value={childSex} onChange={(e) => setChildSex(e.target.value)}>
                  <FormControlLabel value="男児" control={<Radio />} label="男児" />
                  <FormControlLabel value="女児" control={<Radio />} label="女児" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* お仕事・ご住所 */}
            <Grid item xs={12}>
              <Typography variant="h6">お仕事について</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField label="どのようなお仕事をしていますか？" value={occupation} onChange={(e) => setOccupation(e.target.value)} fullWidth placeholder="例）IT系・事務・営業・在宅ワーク等" />
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">産後の状況</FormLabel>
                <RadioGroup row value={postpartumStatus} onChange={(e) => setPostpartumStatus(e.target.value)}>
                  <FormControlLabel value="産後仕事を休んでいる" control={<Radio />} label="産後仕事を休んでいる" />
                  <FormControlLabel value="退職した" control={<Radio />} label="退職した" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">ご住所</Typography>
            </Grid>
            <Grid item xs={6}>
              <TextField label="郵便番号 (自宅) *" value={homePostalCode} onChange={(e) => setHomePostalCode(e.target.value)} fullWidth placeholder="例）1234567" required />
            </Grid>
            <Grid item xs={6}>
              <TextField label="ご自宅住所 *" value={homeAddress} onChange={(e) => setHomeAddress(e.target.value)} fullWidth placeholder="例）東京都新宿区○○～" required />
            </Grid>
            <Grid item xs={6}>
              <TextField label="郵便番号 (里帰り先)" value={rikaeriPostalCode} onChange={(e) => setRikaeriPostalCode(e.target.value)} fullWidth placeholder="例）7654321" />
            </Grid>
            <Grid item xs={6}>
              <TextField label="里帰り先住所" value={rikaeriAddress} onChange={(e) => setRikaeriAddress(e.target.value)} fullWidth placeholder="例：大阪府大阪市◯◯～" />
            </Grid>

            {/* 出産状況 */}
            <Grid item xs={12}>
              <Typography variant="h6">出産の状況</Typography>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">出産方法 *</FormLabel>
                <RadioGroup row value={deliveryMethod} onChange={(e) => setDeliveryMethod(e.target.value)}>
                  {["帝王切開(予定)", "帝王切開(救急)", "麻酔分娩", "吸引分娩", "IUGR(胎児発育不全)", "その他"].map(method => (
                    <FormControlLabel key={method} value={method} control={<Radio />} label={method} />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <TextField label="出産週数(○週) *" value={deliveryWeek} onChange={(e) => setDeliveryWeek(e.target.value)} fullWidth placeholder="例）38週" required />
            </Grid>
            <Grid item xs={6}>
              <TextField label="出生時の体重 (g) *" value={birthWeight} onChange={(e) => setBirthWeight(e.target.value)} fullWidth placeholder="例）3000" required />
            </Grid>
            <Grid item xs={6}>
              <TextField label="退院時の体重 (g) *" value={dischargeWeight} onChange={(e) => setDischargeWeight(e.target.value)} fullWidth placeholder="例）2800" required />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="退院日"
                  value={dischargeDate}
                  onChange={(newValue) => setDischargeDate(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6} />
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="日付1"
                  value={measurement1Date}
                  onChange={(newValue) => setMeasurement1Date(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField label="体重1 (g)" value={measurement1} onChange={(e) => setMeasurement1(e.target.value)} fullWidth placeholder="例）2950" />
            </Grid>
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="日付2"
                  value={measurement2Date}
                  onChange={(newValue) => setMeasurement2Date(newValue)}
                  slotProps={{
                    textField: {
                      fullWidth: true
                    }
                  }}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={6}>
              <TextField label="体重2 (g)" value={measurement2} onChange={(e) => setMeasurement2(e.target.value)} fullWidth placeholder="例）3100" />
            </Grid>

            {/* 妊娠時・医療歴 */}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">妊娠時の状況 *</FormLabel>
                <RadioGroup row value={pregnancyCondition} onChange={(e) => setPregnancyCondition(e.target.value)}>
                  {["特になし", "妊娠糖尿病", "妊娠高血圧", "逆子", "その他"].map(option => (
                    <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">病歴 *</FormLabel>
                <RadioGroup row value={pastMedicalHistory} onChange={(e) => setPastMedicalHistory(e.target.value)}>
                  {["なし", "喘息等", "その他の病歴"].map(option => (
                    <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">内服薬 *</FormLabel>
                <RadioGroup row value={medication} onChange={(e) => setMedication(e.target.value)}>
                  {["なし", "漢方薬", "鎮痛解熱剤", "その他の内服薬"].map(option => (
                    <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">感染症既往 *</FormLabel>
                <RadioGroup row value={infectionHistory} onChange={(e) => setInfectionHistory(e.target.value)}>
                  {["なし", "ウイルス性肝炎(A/B/C型肝炎)", "AIDS", "COVID-19", "その他"].map(option => (
                    <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
                  ))}
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField label="家族相関" value={familyHistory} onChange={(e) => setFamilyHistory(e.target.value)} fullWidth placeholder="例）夫30歳、上の子 小1(6歳) など" />
            </Grid>

            {/* ご来院理由 */}
            <Grid item xs={12}>
              <FormControl component="fieldset">
                <FormLabel component="legend">ご来院理由 *</FormLabel>
                <FormControlLabel
                  control={<Checkbox checked={visitReason.includes("母乳不足")} onChange={() => handleVisitReasonChange("母乳不足")} />}
                  label="母乳不足"
                />
                <FormControlLabel
                  control={<Checkbox checked={visitReason.includes("授乳を嫌がる")} onChange={() => handleVisitReasonChange("授乳を嫌がる")} />}
                  label="授乳を嫌がる"
                />
                <FormControlLabel
                  control={<Checkbox checked={visitReason.includes("体重増加が不安")} onChange={() => handleVisitReasonChange("体重増加が不安")} />}
                  label="体重増加が不安"
                />
                <FormControlLabel
                  control={<Checkbox checked={visitReason.includes("乳房の張り感")} onChange={() => handleVisitReasonChange("乳房の張り感")} />}
                  label="乳房の張り感"
                />
                <FormControlLabel
                  control={<Checkbox checked={visitReason.includes("しこり")} onChange={() => handleVisitReasonChange("しこり")} />}
                  label="しこり"
                />
                <FormControlLabel
                  control={<Checkbox checked={visitReason.includes("乳首が痛む")} onChange={() => handleVisitReasonChange("乳首が痛む")} />}
                  label="乳首が痛む"
                />
                <FormControlLabel
                  control={<Checkbox checked={visitReason.includes("白斑(はくはん)")} onChange={() => handleVisitReasonChange("白斑(はくはん)")} />}
                  label="白斑(はくはん)"
                />
                <FormControlLabel
                  control={<Checkbox checked={visitReason.includes("乳腺炎")} onChange={() => handleVisitReasonChange("乳腺炎")} />}
                  label="乳腺炎"
                />
                <FormControlLabel
                  control={<Checkbox checked={visitReason.includes("発熱")} onChange={() => handleVisitReasonChange("発熱")} />}
                  label="発熱"
                />
                <FormControlLabel
                  control={<Checkbox checked={visitReason.includes("乳房の痛み")} onChange={() => handleVisitReasonChange("乳房の痛み")} />}
                  label="乳房の痛み"
                />
                <FormControlLabel
                  control={<Checkbox checked={visitReason.includes("卒乳・断乳")} onChange={() => handleVisitReasonChange("卒乳・断乳")} />}
                  label="卒乳・断乳"
                />
                <FormControlLabel
                  control={<Checkbox checked={visitReason.includes("分泌量を増やしたい")} onChange={() => handleVisitReasonChange("分泌量を増やしたい")} />}
                  label="分泌量を増やしたい"
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField label="その他ご自由記載（ご紹介者など）" value={additionalNotes} onChange={(e) => setAdditionalNotes(e.target.value)} fullWidth placeholder="その他自由に記入してください" />
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ mt: 2 }}>
                <Button type="submit" variant="contained" fullWidth>送信</Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
