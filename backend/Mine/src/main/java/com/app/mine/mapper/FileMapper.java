package com.app.mine.mapper;

import com.app.mine.vo.FileVO;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FileMapper {

    public void insertFile(FileVO fileVO);
}
