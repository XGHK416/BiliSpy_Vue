export function returnVip(vip) {
  {
    switch (vip) {
      case 'BIG_VIP':
        return '大会员'
        break;
      case 'VISITOR':
        return '游客'
        break;
      case 'YEARS_BIG_VIP':
        return '年度大会员'
        break;

      default:
        break;
    }
  }
}
