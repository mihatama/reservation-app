// File: src/pages/MedicalRecordPage.js

import React, { useState } from 'react';

// 新バージョンのAmplify
import { GraphQLAPI, graphqlOperation } from '@aws-amplify/api-graphql';

// 旧バージョンの場合 (要確認):
// import { API, graphqlOperation } from 'aws-amplify';

import { createMedicalRecord } from '../graphql/mutations'; 
import {
  Box,
  TextField,
  Button,
  Typography,
  MenuItem
} from '@mui/material';

export default function MedicalRecordPage() {
  // 入力フォームの state
  const [formData, setFormData] = useState({
    recordNo: '',
    recordMonth: '',
    recordDay: '',
    place: '',
    staffName: '',
    traineeName: '',
    childName: '',
    childAgeYears: '',
    childAgeMonths: '',
    childAgeDays: '',
    weight: '',
    weightGain: '',
    breastInterval: '',
    formula: '',
    expressedMilk: '',
    babyFood: '',
    stoolCount: '',
    urineCount: '',
    childDevelopment: '',
    weaningStatus: '',
    dayCount: '',
    breastShape: '',
    nippleUsage: '',
    expressionTimes: '',
    expressionTool: '',
    nippleCondition: '',
    pain: '',
    breastfeedingPosition: '',
    familySupport: '',
    oMemo: '',
    sMemo: '',
    pMemo: '',
    breastDiagnosis: '',
    paymentMethod: '',
    additionalFees: '',
    otherNotes: '',
  });

  // フィールド変更ハンドラ
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 保存ボタン
  const handleSave = async () => {
    try {
      // GraphQLAPI で mutation 実行
      await GraphQLAPI.graphql(
        graphqlOperation(createMedicalRecord, { input: formData })
      );
      alert('電子カルテを保存しました。');

      // フォームリセット
      setFormData({
        recordNo: '',
        recordMonth: '',
        recordDay: '',
        place: '',
        staffName: '',
        traineeName: '',
        childName: '',
        childAgeYears: '',
        childAgeMonths: '',
        childAgeDays: '',
        weight: '',
        weightGain: '',
        breastInterval: '',
        formula: '',
        expressedMilk: '',
        babyFood: '',
        stoolCount: '',
        urineCount: '',
        childDevelopment: '',
        weaningStatus: '',
        dayCount: '',
        breastShape: '',
        nippleUsage: '',
        expressionTimes: '',
        expressionTool: '',
        nippleCondition: '',
        pain: '',
        breastfeedingPosition: '',
        familySupport: '',
        oMemo: '',
        sMemo: '',
        pMemo: '',
        breastDiagnosis: '',
        paymentMethod: '',
        additionalFees: '',
        otherNotes: '',
      });
    } catch (err) {
      console.error('Error creating MedicalRecord:', err);
      alert('保存に失敗しました。');
    }
  };

  return (
    <Box sx={{ maxWidth: 600, margin: '0 auto', p: 2 }}>
      <Typography variant="h6" mb={2}>
        電子カルテ 作成フォーム
      </Typography>

      {/* 場所（Select） */}
      <TextField
        select
        fullWidth
        label="場所"
        name="place"
        value={formData.place}
        onChange={handleChange}
        margin="dense"
        size="small"
      >
        <MenuItem value="">未選択</MenuItem>
        <MenuItem value="宝塚">宝塚</MenuItem>
        <MenuItem value="西宮">西宮</MenuItem>
        <MenuItem value="名古屋">名古屋</MenuItem>
        <MenuItem value="浦和">浦和</MenuItem>
        <MenuItem value="訪問">訪問</MenuItem>
        <MenuItem value="産後ケア">産後ケア</MenuItem>
      </TextField>

      {/* No */}
      <TextField
        fullWidth
        label="No"
        name="recordNo"
        value={formData.recordNo}
        onChange={handleChange}
        margin="dense"
        size="small"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
        placeholder="例: 001"
      />

      {/* 月日 */}
      <Box display="flex" gap={1}>
        <TextField
          label="月"
          name="recordMonth"
          value={formData.recordMonth}
          onChange={handleChange}
          margin="dense"
          size="small"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="例: 8"
          sx={{ flex: 1 }}
        />
        <TextField
          label="日"
          name="recordDay"
          value={formData.recordDay}
          onChange={handleChange}
          margin="dense"
          size="small"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          placeholder="例: 15"
          sx={{ flex: 1 }}
        />
      </Box>

      {/* 担当者名・研修生名 */}
      <TextField
        fullWidth
        label="担当者名"
        name="staffName"
        value={formData.staffName}
        onChange={handleChange}
        margin="dense"
        size="small"
        placeholder="担当スタッフ氏名"
      />
      <TextField
        fullWidth
        label="研修生名"
        name="traineeName"
        value={formData.traineeName}
        onChange={handleChange}
        margin="dense"
        size="small"
        placeholder="研修生の方の氏名"
      />

      {/* お子様情報 */}
      <TextField
        fullWidth
        label="お子様の名前"
        name="childName"
        value={formData.childName}
        onChange={handleChange}
        margin="dense"
        size="small"
        placeholder="例: まなり たろう"
      />

      <Box display="flex" gap={1}>
        <TextField
          label="年齢(歳)"
          name="childAgeYears"
          value={formData.childAgeYears}
          onChange={handleChange}
          margin="dense"
          size="small"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          sx={{ flex: 1 }}
        />
        <TextField
          label="年齢(月)"
          name="childAgeMonths"
          value={formData.childAgeMonths}
          onChange={handleChange}
          margin="dense"
          size="small"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          sx={{ flex: 1 }}
        />
        <TextField
          label="年齢(日)"
          name="childAgeDays"
          value={formData.childAgeDays}
          onChange={handleChange}
          margin="dense"
          size="small"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          sx={{ flex: 1 }}
        />
      </Box>

      <Box display="flex" gap={1}>
        <TextField
          label="体重 (g)"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          margin="dense"
          size="small"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          sx={{ flex: 1 }}
          placeholder="例: 3200"
        />
        <TextField
          label="増加量 (g/日)"
          name="weightGain"
          value={formData.weightGain}
          onChange={handleChange}
          margin="dense"
          size="small"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          sx={{ flex: 1 }}
          placeholder="例: 30"
        />
      </Box>

      {/* 授乳・ミルク・離乳食 */}
      <TextField
        fullWidth
        label="母乳間隔"
        name="breastInterval"
        value={formData.breastInterval}
        onChange={handleChange}
        margin="dense"
        size="small"
        placeholder="例: 3時間おき"
      />
      <TextField
        fullWidth
        label="ミルク (ml/回 数など)"
        name="formula"
        value={formData.formula}
        onChange={handleChange}
        margin="dense"
        size="small"
        placeholder="例: 80mlを1日3回"
      />
      <TextField
        fullWidth
        label="搾母乳 (ml/回 数など)"
        name="expressedMilk"
        value={formData.expressedMilk}
        onChange={handleChange}
        margin="dense"
        size="small"
        placeholder="例: 40mlを1日2回"
      />
      <TextField
        fullWidth
        label="離乳食 (硬さや補食の状況)"
        name="babyFood"
        value={formData.babyFood}
        onChange={handleChange}
        margin="dense"
        size="small"
        placeholder="例: 10倍粥・ペースト状"
      />

      {/* 便・尿回数 */}
      <Box display="flex" gap={1}>
        <TextField
          label="便回数"
          name="stoolCount"
          value={formData.stoolCount}
          onChange={handleChange}
          margin="dense"
          size="small"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          sx={{ flex: 1 }}
        />
        <TextField
          label="尿回数"
          name="urineCount"
          value={formData.urineCount}
          onChange={handleChange}
          margin="dense"
          size="small"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          sx={{ flex: 1 }}
        />
      </Box>

      {/* 発達・断乳 */}
      <TextField
        fullWidth
        label="児の発達"
        name="childDevelopment"
        value={formData.childDevelopment}
        onChange={handleChange}
        margin="dense"
        size="small"
        placeholder="例: 首すわり・寝返りなど"
      />
      <TextField
        fullWidth
        label="卒乳/断乳"
        name="weaningStatus"
        value={formData.weaningStatus}
        onChange={handleChange}
        margin="dense"
        size="small"
        placeholder="例: 断乳予定 / 卒乳済 など"
      />

      {/* 乳房ケア情報 */}
      <TextField
        fullWidth
        label="乳房ケア日目"
        name="dayCount"
        value={formData.dayCount}
        onChange={handleChange}
        margin="dense"
        size="small"
        type="number"
        inputMode="numeric"
        pattern="[0-9]*"
      />
      <TextField
        fullWidth
        label="乳房の形 (Ⅰ型・Ⅱa型等)"
        name="breastShape"
        value={formData.breastShape}
        onChange={handleChange}
        margin="dense"
        size="small"
      />
      <TextField
        fullWidth
        label="ニップル使用"
        name="nippleUsage"
        value={formData.nippleUsage}
        onChange={handleChange}
        margin="dense"
        size="small"
      />

      <Box display="flex" gap={1}>
        <TextField
          label="搾乳1日回数"
          name="expressionTimes"
          value={formData.expressionTimes}
          onChange={handleChange}
          margin="dense"
          size="small"
          type="number"
          inputMode="numeric"
          pattern="[0-9]*"
          sx={{ flex: 1 }}
        />
        <TextField
          label="搾乳器 (手動・電動)"
          name="expressionTool"
          value={formData.expressionTool}
          onChange={handleChange}
          margin="dense"
          size="small"
          sx={{ flex: 1 }}
        />
      </Box>

      <TextField
        fullWidth
        label="乳頭・乳輪の状態 (白斑/亀裂/発赤等)"
        name="nippleCondition"
        value={formData.nippleCondition}
        onChange={handleChange}
        margin="dense"
        size="small"
      />
      <TextField
        fullWidth
        label="疼痛 (乳頭/乳房 等)"
        name="pain"
        value={formData.pain}
        onChange={handleChange}
        margin="dense"
        size="small"
      />
      <TextField
        fullWidth
        label="授乳姿勢"
        name="breastfeedingPosition"
        value={formData.breastfeedingPosition}
        onChange={handleChange}
        margin="dense"
        size="small"
      />

      {/* サポート状況 */}
      <TextField
        fullWidth
        label="家族などのサポート状況"
        name="familySupport"
        value={formData.familySupport}
        onChange={handleChange}
        margin="dense"
        size="small"
      />

      {/* O, S, P メモ */}
      <TextField
        fullWidth
        label="O) メモ"
        name="oMemo"
        value={formData.oMemo}
        onChange={handleChange}
        margin="dense"
        size="small"
        multiline
        rows={2}
      />
      <TextField
        fullWidth
        label="S) メモ"
        name="sMemo"
        value={formData.sMemo}
        onChange={handleChange}
        margin="dense"
        size="small"
        multiline
        rows={2}
      />
      <TextField
        fullWidth
        label="P) メモ"
        name="pMemo"
        value={formData.pMemo}
        onChange={handleChange}
        margin="dense"
        size="small"
        multiline
        rows={2}
      />

      {/* 診断・支払い情報 */}
      <TextField
        fullWidth
        label="乳房診断"
        name="breastDiagnosis"
        value={formData.breastDiagnosis}
        onChange={handleChange}
        margin="dense"
        size="small"
      />
      <TextField
        fullWidth
        label="支払い方法 (カード・PayPay・現金等)"
        name="paymentMethod"
        value={formData.paymentMethod}
        onChange={handleChange}
        margin="dense"
        size="small"
      />
      <TextField
        fullWidth
        label="追加料金 (初診料, チケット等)"
        name="additionalFees"
        value={formData.additionalFees}
        onChange={handleChange}
        margin="dense"
        size="small"
      />
      <TextField
        fullWidth
        label="その他"
        name="otherNotes"
        value={formData.otherNotes}
        onChange={handleChange}
        margin="dense"
        size="small"
        multiline
        rows={3}
      />

      {/* 保存ボタン */}
      <Box textAlign="center" mt={4}>
        <Button variant="contained" color="primary" onClick={handleSave}>
          保存
        </Button>
      </Box>
    </Box>
  );
}
