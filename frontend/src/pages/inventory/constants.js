/**
 * Inventory Constants & Material Classification Definitions
 */
export const MATERIAL_FALLBACK_MAP = {
  // Enhancement Stones & Ores
  da_cuong_hoa: { id: 'da_cuong_hoa', name: 'Đá Cường Hóa', tier: 2, category: 'spirit', description: 'Linh thạch đặc thù dùng để cường hóa trang bị tại Lò Tạo Hóa.', icon: '✨', sellPrice: 50 },
  quang_dong: { id: 'quang_dong', name: 'Quặng Đồng', tier: 1, category: 'spirit', description: 'Quặng đồng thau sơ cấp, nền tảng đúc khí rèn trang bị.', icon: '⛏️', sellPrice: 8 },
  quang_bac: { id: 'quang_bac', name: 'Quặng Bạc', tier: 2, category: 'spirit', description: 'Quặng bạc sáng loáng, linh khí ẩn chứa, dùng rèn bảo khí trung cấp.', icon: '⛏️', sellPrice: 20 },
  quang_vang: { id: 'quang_vang', name: 'Quặng Vàng', tier: 3, category: 'spirit', description: 'Quặng vàng rực rỡ, hấp thu nhật nguyệt tinh hoa, rèn trang bị cao cấp.', icon: '⛏️', sellPrice: 60 },
  huyen_thiet: { id: 'huyen_thiet', name: 'Huyền Thiết', tier: 3, category: 'spirit', description: 'Huyền thiết ngàn năm cứng rắn vô cùng, tài liệu thượng hạng để rèn bảo khí.', icon: '⛏️', sellPrice: 80 },
  mat_thiet_khoang_tho: { id: 'mat_thiet_khoang_tho', name: 'Thiết Khoáng Thô', tier: 1, category: 'spirit', description: 'Quặng sắt thô lộ thiên đặc thù vùng ngoại ô Thanh Lam Trấn.', icon: '⛏️', sellPrice: 10 },
  mat_bang_phach_thach: { id: 'mat_bang_phach_thach', name: 'Băng Phách Thạch', tier: 2, category: 'elemental', description: 'Quặng tinh thể hàn băng đặc thù vùng cực bắc Bắc Sương Cảnh.', icon: '⛏️', sellPrice: 45 },
  mat_thiet_huyet_khoang: { id: 'mat_thiet_huyet_khoang', name: 'Thiết Huyết Quặng', tier: 3, category: 'spirit', description: 'Mạch khoáng sắt đỏ au đặc thù của Thiết Huyết Sơn.', icon: '⛏️', sellPrice: 65 },
  mat_loi_tinh_thach: { id: 'mat_loi_tinh_thach', name: 'Lôi Kiếp Thạch', tier: 3, category: 'elemental', description: 'Khoáng thạch đặc thù đáy Thiên Kiếp Uyên, trải qua thiên lôi tôi luyện.', icon: '⛏️', sellPrice: 85 },
  mat_dia_hoa_tinh: { id: 'mat_dia_hoa_tinh', name: 'Địa Hỏa Tinh Thạch', tier: 3, category: 'elemental', description: 'Tinh thạch hỏa hệ đặc thù kết tinh từ lõi mắc-ma Thiên Hỏa Linh Địa.', icon: '⛏️', sellPrice: 80 },
  mat_tinh_tieu_thach: { id: 'mat_tinh_tieu_thach', name: 'Tinh Tiêu Thạch', tier: 4, category: 'spirit', description: 'Khoáng thạch tinh tú đặc thù ngưng tụ từ bụi sao băng giữa Chư Thiên Tinh Hải.', icon: '⛏️', sellPrice: 450 },
  mat_hu_khong: { id: 'mat_hu_khong', name: 'Hư Không Thạch', tier: 4, category: 'rare', description: 'Khoáng thạch trôi nổi từ khe nứt hư không viễn cổ.', icon: '⛏️', sellPrice: 600 },
  ban_nguyen_tinh: { id: 'ban_nguyen_tinh', name: 'Bản Nguyên Tinh', tier: 5, category: 'spirit', description: 'Tinh hoa bản nguyên vũ trụ ngưng tụ, chí bảo khoáng thạch vô giá.', icon: '⛏️', sellPrice: 2000 },
  mat_hac_thach: { id: 'mat_hac_thach', name: 'Hắc Phong Thạch', tier: 1, category: 'basic', description: 'Đá đen trầm tích ngâm trong gió độc Hắc Phong Lâm hàng trăm năm.', icon: '⛏️', sellPrice: 14 },
  mat_u_hon_thach: { id: 'mat_u_hon_thach', name: 'U Hồn Thạch', tier: 2, category: 'spirit', description: 'Khoáng thạch đặc thù của Vọng Linh Cốc, hấp thụ âm khí và linh hồn.', icon: '⛏️', sellPrice: 35 },
  mat_hac_sa_tinh: { id: 'mat_hac_sa_tinh', name: 'Hắc Sa Tinh', tier: 2, category: 'elemental', description: 'Tinh thể cát đen đặc thù kết tinh dưới sấm sét sa mạc Ám Sát Hoang.', icon: '⛏️', sellPrice: 50 },

  // Beast parts & trophies
  mat_thit_tho: { id: 'mat_thit_tho', name: 'Thịt Thô', tier: 1, category: 'basic', description: 'Thịt thường, dùng hồi máu hoặc chế đồ cơ bản.', icon: '🐺', sellPrice: 1 },
  mat_da_tho: { id: 'mat_da_tho', name: 'Da Thô', tier: 1, category: 'basic', description: 'Da thú bình thường, chế giáp cơ bản.', icon: '🐺', sellPrice: 2 },
  mat_xuong_vun: { id: 'mat_xuong_vun', name: 'Xương Vụn', tier: 1, category: 'basic', description: 'Mảnh xương vỡ, dùng chế vũ khí đơn giản.', icon: '🐺', sellPrice: 1 },
  mat_noc_xa: { id: 'mat_noc_xa', name: 'Nọc Xà', tier: 1, category: 'basic', description: 'Nọc độc rắn xanh, dùng tẩm tên hoặc chế đan dược.', icon: '🐺', sellPrice: 3 },
  mat_da_ran: { id: 'mat_da_ran', name: 'Da Rắn', tier: 1, category: 'basic', description: 'Da rắn dai, chế giáp nhẹ.', icon: '🐺', sellPrice: 2 },
  mat_long_hoa: { id: 'mat_long_hoa', name: 'Lông Hỏa', tier: 2, category: 'elemental', description: 'Lông hồ ly chứa hỏa tinh rực cháy.', icon: '🐺', sellPrice: 12 },
  mat_vo_cung: { id: 'mat_vo_cung', name: 'Vỏ Cứng', tier: 2, category: 'basic', description: 'Mảnh giáp từ Thiết Giáp Trùng cực kỳ kiên cố.', icon: '🐺', sellPrice: 15 },
  mat_rang_soi_vuong: { id: 'mat_rang_soi_vuong', name: 'Răng Sói Vương', tier: 3, category: 'basic', description: 'Nanh sói vương sắc bén, chế vũ khí sát thương cao.', icon: '🐺', sellPrice: 30 },
  mat_loi_vu: { id: 'mat_loi_vu', name: 'Lôi Vũ', tier: 3, category: 'elemental', description: 'Lông chim sấm chứa lôi tinh mang điện tích.', icon: '🐺', sellPrice: 28 },
  mat_ba_vuong_nanh: { id: 'mat_ba_vuong_nanh', name: 'Nanh Bá Vương', tier: 4, category: 'basic', description: 'Răng nanh cự thú hồng hoang vô cùng kiên cố.', icon: '🐺', sellPrice: 250 },
  mat_loi_de_vu: { id: 'mat_loi_de_vu', name: 'Lôi Đế Vũ', tier: 4, category: 'elemental', description: 'Lông vũ tích điện của Thần Điểu Lôi Đế.', icon: '🐺', sellPrice: 400 },
  mat_huyet_ma_ban_giap: { id: 'mat_huyet_ma_ban_giap', name: 'Huyết Ma Bản Giáp', tier: 5, category: 'rare', description: 'Mảnh giáp xương của Huyết Ma Thượng Cổ bất hoại.', icon: '🐺', sellPrice: 1500 },

  // Herbs & Flora
  linh_thao: { id: 'linh_thao', name: 'Linh Thảo', tier: 1, category: 'herb', description: 'Cỏ linh khí nhạt, nền tảng của Luyện Đan.', icon: '🌿', sellPrice: 5 },
  huyet_thao: { id: 'huyet_thao', name: 'Huyết Thảo', tier: 1, category: 'herb', description: 'Cỏ đỏ như máu, chứa sinh khí dương dồi dào.', icon: '🌿', sellPrice: 8 },
  doc_thao: { id: 'doc_thao', name: 'Độc Thảo', tier: 1, category: 'herb', description: 'Sinh trưởng trong đầm lầy, kịch độc.', icon: '🌿', sellPrice: 5 },
  thanh_linh_thao: { id: 'thanh_linh_thao', name: 'Thanh Linh Thảo', tier: 2, category: 'herb', description: 'Linh thảo thanh sạch, nâng cao hiệu suất luyện đan.', icon: '🌿', sellPrice: 20 },
  hoa_linh_chi: { id: 'hoa_linh_chi', name: 'Hỏa Linh Chi', tier: 2, category: 'herb', description: 'Linh chi mang hỏa cực dương sinh trưởng nơi núi lửa.', icon: '🌿', sellPrice: 25 },
  bang_linh_thao: { id: 'bang_linh_thao', name: 'Băng Linh Thảo', tier: 2, category: 'herb', description: 'Thảo mộc lạnh lẽo, hái từ đỉnh tuyết ngàn năm.', icon: '🌿', sellPrice: 30 },
  kim_linh_thao: { id: 'kim_linh_thao', name: 'Kim Linh Thảo', tier: 3, category: 'herb', description: 'Linh thảo hấp thụ tinh quang nhật nguyệt.', icon: '🌿', sellPrice: 60 },
  thien_linh_thao: { id: 'thien_linh_thao', name: 'Thiên Linh Thảo', tier: 4, category: 'herb', description: 'Tuyệt phẩm thảo mộc, tụ tập tinh hoa vũ trụ.', icon: '🌿', sellPrice: 200 },
  mat_thao_moc_thanh_lam: { id: 'mat_thao_moc_thanh_lam', name: 'Thanh Lam Diệp', tier: 1, category: 'herb', description: 'Lá thảo mộc đặc thù của trấn Thanh Lam, giúp định tâm.', icon: '🌿', sellPrice: 12 },
  mat_am_hon_thao: { id: 'mat_am_hon_thao', name: 'Ám Hồn Thảo', tier: 3, category: 'herb', description: 'Thảo dược sinh trưởng nơi âm u tích tụ hồn khí.', icon: '🌿', sellPrice: 65 },
  mat_huyen_bang_hoa: { id: 'mat_huyen_bang_hoa', name: 'Huyền Băng Hoa', tier: 3, category: 'herb', description: 'Bông hoa kết tinh từ hàn băng vạn năm.', icon: '🌿', sellPrice: 75 },
  mat_huyen_thien_hoa: { id: 'mat_huyen_thien_hoa', name: 'Huyền Thiên Hoa', tier: 3, category: 'herb', description: 'Đóa hoa hấp thụ linh khí huyền thiên.', icon: '🌿', sellPrice: 85 },
  mat_sa_tinh_thao: { id: 'mat_sa_tinh_thao', name: 'Sa Tinh Thảo', tier: 2, category: 'herb', description: 'Thảo dược gai kiên cường giữa bão cát tử thần.', icon: '🌿', sellPrice: 35 },
  mat_u_minh_thao: { id: 'mat_u_minh_thao', name: 'U Minh Quỷ Thảo', tier: 3, category: 'herb', description: 'Cỏ âm linh mọc ven bờ Vong Xuyên phát sáng ma mị.', icon: '🌿', sellPrice: 95 },

  // Spiritual Catalysts & Essences
  mat_tinh_thach: { id: 'mat_tinh_thach', name: 'Tinh Thạch', tier: 2, category: 'spirit', description: 'Đá tinh chất, dùng nâng cấp trang bị.', icon: '💎', sellPrice: 22 },
  mat_kim_loai_linh: { id: 'mat_kim_loai_linh', name: 'Kim Loại Linh', tier: 2, category: 'basic', description: 'Kim loại chứa linh khí, chế giáp tốt.', icon: '💎', sellPrice: 18 },
  mat_tinh_hoa: { id: 'mat_tinh_hoa', name: 'Tinh Hỏa', tier: 2, category: 'elemental', description: 'Tinh hoa nguyên tố hỏa. Craft vũ khí lửa.', icon: '💎', sellPrice: 25 },
  mat_huyet_tinh: { id: 'mat_huyet_tinh', name: 'Huyết Tinh', tier: 3, category: 'spirit', description: 'Tinh huyết từ Huyết Lang Vương.', icon: '💎', sellPrice: 35 },
  mat_noi_dan_nho: { id: 'mat_noi_dan_nho', name: 'Nội Đan Nhỏ', tier: 2, category: 'spirit', description: 'Nội đan quái vật cấp thấp, chứa năng lượng.', icon: '💎', sellPrice: 20 },
  mat_noi_dan_trung: { id: 'mat_noi_dan_trung', name: 'Nội Đan Trung', tier: 3, category: 'spirit', description: 'Nội đan trung cấp, đột phá hoặc chế đan.', icon: '💎', sellPrice: 50 },
  mat_noi_dan_lon: { id: 'mat_noi_dan_lon', name: 'Nội Đan Lớn', tier: 4, category: 'spirit', description: 'Nội đan quái vật cao cấp, năng lượng bàng bạc.', icon: '💎', sellPrice: 300 },
  mat_noi_dan_cuc: { id: 'mat_noi_dan_cuc', name: 'Cực Phẩm Nội Đan', tier: 5, category: 'spirit', description: 'Nội đan cửu phẩm yêu hoàng vạn năm.', icon: '💎', sellPrice: 1200 },
  mat_khong_gian_manh: { id: 'mat_khong_gian_manh', name: 'Mảnh Vỡ Không Gian', tier: 1, category: 'rare', description: 'Mảnh vụn không gian, chứa năng lượng trữ vật.', icon: '💎', sellPrice: 80 },
  mat_khong_gian_thach: { id: 'mat_khong_gian_thach', name: 'Không Gian Thạch', tier: 2, category: 'rare', description: 'Đá không gian hoàn chỉnh, dùng luyện nhẫn trữ vật.', icon: '💎', sellPrice: 250 },
  mat_hu_khong_tinh: { id: 'mat_hu_khong_tinh', name: 'Hư Không Tinh', tier: 3, category: 'rare', description: 'Tinh thể hư không, chứa khoảng không lớn.', icon: '💎', sellPrice: 800 },
  mat_gioi_tu_thach: { id: 'mat_gioi_tu_thach', name: 'Giới Tử Thạch', tier: 4, category: 'rare', description: 'Hòn đá có thể chứa cả thế giới bên trong.', icon: '💎', sellPrice: 3000 },
  linh_dich: { id: 'linh_dich', name: 'Linh Dịch', tier: 1, category: 'essence', description: 'Chất lỏng tinh khiết ngưng tụ từ thiên địa.', icon: '💎', sellPrice: 10 },
  mat_cuu_u_hac_thuy: { id: 'mat_cuu_u_hac_thuy', name: 'Cửu U Hắc Thủy', tier: 4, category: 'essence', description: 'Chất lỏng huyền bí đặc thù lạnh thấu linh hồn.', icon: '💎', sellPrice: 500 },
  mat_hon_don_khi: { id: 'mat_hon_don_khi', name: 'Hỗn Độn Khí Tinh', tier: 5, category: 'essence', description: 'Khí tức nguyên thủy trước khi vũ trụ khai sinh.', icon: '💎', sellPrice: 2500 },
  mat_hon_nguyen_chau: { id: 'mat_hon_nguyen_chau', name: 'Hỗn Nguyên Đạo Châu', tier: 5, category: 'rare', description: 'Hạt ngọc tối thượng kết tinh từ đại đạo vô thượng.', icon: '💎', sellPrice: 5000 },
  mat_tinh_thach_lon: { id: 'mat_tinh_thach_lon', name: 'Tinh Thạch Lớn', tier: 4, category: 'spirit', description: 'Tinh thạch khổng lồ chứa linh lực dồi dào.', icon: '✨', sellPrice: 100 },
}

export function classifyMaterial(id, mat) {
  if (id === 'da_cuong_hoa' || id.includes('phu') || id === 'mat_tinh_thach_lon') {
    return 'enhance'
  }
  const ores = [
    'quang_dong', 'quang_bac', 'quang_vang', 'huyen_thiet', 'mat_thiet_khoang_tho',
    'mat_bang_phach_thach', 'mat_thiet_huyet_khoang', 'mat_loi_tinh_thach',
    'mat_dia_hoa_tinh', 'mat_tinh_tieu_thach', 'mat_hu_khong', 'ban_nguyen_tinh',
    'mat_hac_thach', 'mat_u_hon_thach', 'mat_hac_sa_tinh'
  ]
  if (ores.includes(id) || id.startsWith('quang_') || id.endsWith('_thach') || id.includes('khoang') || id.includes('thiet')) {
    return 'mineral'
  }
  const beast = [
    'mat_thit_tho', 'mat_da_tho', 'mat_xuong_vun', 'mat_noc_xa', 'mat_da_ran',
    'mat_long_hoa', 'mat_vo_cung', 'mat_rang_soi_vuong', 'mat_loi_vu',
    'mat_ba_vuong_nanh', 'mat_loi_de_vu', 'mat_huyet_ma_ban_giap'
  ]
  if (beast.includes(id) || id.includes('da_ran') || id.includes('nanh') || id.includes('vuong') || id.includes('soi') || id.includes('giap')) {
    return 'beast'
  }
  if (mat?.category === 'herb' || id.includes('thao') || id.includes('chi') || id.includes('hoa') || id.includes('diep')) {
    return 'herb'
  }
  return 'catalyst'
}

export function getMaterialIcon(group, mat) {
  if (mat?.icon) return mat.icon
  if (group === 'mineral') return '⛏️'
  if (group === 'beast') return '🐺'
  if (group === 'herb') return '🌿'
  if (group === 'enhance') return '✨'
  return '💎'
}

export function formatMaterialName(id) {
  return id
    .replace(/^mat_/, '')
    .split('_')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

export const EQUIPMENT_SLOTS = [
  { key: 'weapon', icon: '⚔️', name: 'Vũ Khí' },
  { key: 'body',   icon: '🥋', name: 'Giáp' },
  { key: 'shield', icon: '🛡️', name: 'Thuẫn' },
  { key: 'feet',   icon: '👢', name: 'Hài' },
  { key: 'ring1',  icon: '💍', name: 'Nhẫn 1' },
  { key: 'ring2',  icon: '💍', name: 'Nhẫn 2' },
]
