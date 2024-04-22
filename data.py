from random import randint
from datetime import datetime, timedelta
import random

def generate_data_and_write_to_file():
    with open("data.txt", "w") as file:
        for i in range(8000):
            sv_code = f"SV{i + 1:06}"  # Đảm bảo mã nhân sự luôn đủ 5 ký tự
            name = f"Sinh vien {i + 1}"
            birth_date = generate_random_date(datetime(2000, 1, 1), datetime(2005, 12, 31))
            cn = random_value_from_array(['HTTT1', 'CNPM1', 'TGMT1', 'MMTVT', 'CNTT1' ])
            ct = random_value_from_array(['CD', 'CLC', 'VP', 'CTTT'])
            phone = random_phone_number()
            data_line = f"SELECT '{sv_code}', '{name}', 'N', TO_DATE('{birth_date}','YYYY-MM-DD'), 'TPHCM', '{phone}', '{ct}', '{cn}', 0 , 0 from dual union all\n"
            file.write(data_line)
            
def generate_data_and_write_to_file2():
    with open("data.txt", "w") as file:
        a = []
        b = []
        for i in range(10000):
            sv_id = random.randint(1, 7999)
            sv_code = f"SV{sv_id + 1:06}"  # Đảm bảo mã nhân sự luôn đủ 5 ký tự
            gv_id = random.randint(1, 109)
            gv_code = f"NS{gv_id + 1:03}"  # Đảm bảo mã nhân sự luôn đủ 3 ký tự
            hp_id = random.randint(1, 74)
            hp_code = f"HP{hp_id + 1:03}"  # Đảm bảo mã nhân sự luôn đủ 3 ký tự
            
            dqt = random.randint(1, 10)
            dth = random.randint(1, 10)
            dck = random.randint(1, 10)
            dtk = round((dqt + dth*2 + dck*3)/6, 2)

            hk = random_value_from_array([1,2,3])
            nam = random_value_from_array([2020,2021,2022, 2023])
            ct = random_value_from_array(['CQ', 'CLC', 'VP', 'CTTT'])

            data_line = f"SELECT '{sv_code}','{gv_code}','{hp_code}',{hk},'{nam}','{ct}',{dth},{dqt},{dck},{dtk} from dual union all \n"
            file.write(data_line)
            
def generate_data_and_write_to_file3(lines):
    with open("data.txt", "w") as file:
        for line in lines:
                
            dqt = random.randint(1, 10)
            dth = random.randint(1, 10)
            dck = random.randint(1, 10)
            dtk = round((dqt + dth*2 + dck*3)/6, 2)

            data_line = f"SELECT {line.strip()},{dth},{dqt},{dck},{dtk} from dual union all \n"
            file.write(data_line)

def generate_data_and_write_to_file4(lines):
    with open("data.txt", "w") as file:
        for line in lines:
            for i in range(30):
                sv_id = random.randint(1, 7999)
                sv_code = f"SV{sv_id + 1:06}"  # Đảm bảo mã nhân sự luôn đủ 8 ký tự

                data_line = f"'{sv_code}',{line.strip()}\n"
                file.write(data_line)

def random_phone_number():
    # Số điện thoại bắt đầu bằng số 0
    phone_number = "0"
    # Số điện thoại có 9 chữ số tiếp theo
    for _ in range(9):
        phone_number += str(random.randint(0, 9))
    return phone_number

def random_value_from_array(arr):
    if not arr:
        return None  # Trả về None nếu mảng rỗng
    return random.choice(arr)

def generate_random_date(start_date, end_date):
    # start_date = datetime(1950, 1, 1)
    # end_date = datetime(2000, 12, 31)
    random_date = start_date + timedelta(days=randint(0, (end_date - start_date).days))
    return random_date.strftime("%Y-%m-%d")

# Số lượng dữ liệu bạn muốn tạo
# number_of_data = int(input("Nhập số lượng dữ liệu bạn muốn tạo: "))

with open('input.txt', 'r') as file:
    # Đọc từng dòng của tệp và lưu vào mảng
    lines = file.readlines()
# Tạo dữ liệu và ghi vào file
generate_data_and_write_to_file3(lines)
print("Dữ liệu đã được tạo và ghi vào file data.txt.")

def find_duplicate_lines(filename):
    # Tạo một từ điển để lưu trữ các dòng và số lần xuất hiện của chúng
    lines_dict = {}

    # Mở tệp văn bản để đọc
    with open(filename, 'r') as file:
        # Đọc từng dòng của tệp
        for line in file:
            # Loại bỏ các ký tự trắng từ đầu và cuối dòng
            line = line.strip()

            # Kiểm tra xem dòng đã tồn tại trong từ điển chưa
            if line in lines_dict:
                # Nếu đã tồn tại, tăng số lần xuất hiện lên 1
                lines_dict[line] += 1
            else:
                # Nếu chưa tồn tại, thêm dòng vào từ điển với số lần xuất hiện là 1
                lines_dict[line] = 1

    # In ra các dòng giống nhau (có số lần xuất hiện lớn hơn 1)
    for line, count in lines_dict.items():
        if count > 1:
            print(f"Dòng '{line}' xuất hiện {count} lần.")
            
# find_duplicate_lines('data.txt')

