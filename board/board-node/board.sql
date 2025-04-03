CREATE TABLE `board` (
	`board_id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'id',
	`subject` VARCHAR(50) NULL DEFAULT NULL COMMENT '제목' COLLATE 'utf8mb4_general_ci',
	`board_body` TEXT NULL DEFAULT NULL COMMENT '내용' COLLATE 'utf8mb4_general_ci',
	`created_at` DATETIME NULL DEFAULT current_timestamp() COMMENT '등록일자',
	`updated_at` DATETIME NULL DEFAULT NULL COMMENT '수정일자',
	PRIMARY KEY (`board_id`) USING BTREE
)
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;
