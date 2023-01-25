import sys
import json


def read_hanja_file(filename):
    fo = open(filename, 'r')
    contents = fo.read()
    return contents



def remove_leading_and_trailing_spaces(spaces_list):
    for i in range(0, len(spaces_list)):
        if len(spaces_list[i]) > 0:
            if spaces_list[i][0] == ' ': # remove leading ' '
                spaces_list[i] = spaces_list[i][1:]
            if spaces_list[i][-1] == ' ': # remove trailing ' '
                spaces_list[i] = spaces_list[i][:-1]

    return spaces_list


def process_def_list(def_list):
    # split by ','
    # want to split by ';'
    # remove initial space
    merged_list = ','.join(def_list)

    # I think here is when I need to fix that split inside brackets issue

    split_list = merged_list.split(';')
    split_list = remove_leading_and_trailing_spaces(split_list)

    return split_list



def process_line(line, current_syllable):
    # format is:
    # [pronunciation]
    # OR
    # hanja_character=hanja_name (can contain , ; =), english meanings (can contain , ;) (stroke_count)
    # names and definitions are optional
    # and there are blank lines at the end


    if len(line) == 0:
        return [0, current_syllable]
    elif line[0] == '[':
        return [0, line[1]]
    else:
        new_hanja = dict()

        [hanja_character, remaining_line] = line.split('=', 1)
        stroke_count = remaining_line.split('(')[-1].split(')')[0]
        remaining_line = remaining_line.rsplit('(', 1)[0]

        new_hanja['character'] = hanja_character
        new_hanja['pronunciation'] = current_syllable
        new_hanja['stroke_count'] = stroke_count

        # awkward part
        names_and_definitions = remaining_line.split(',')
        # print(names_and_definitions)

        # check if any names
        if len(names_and_definitions) == 1: # only name or all blank
            new_hanja['names'] = names_and_definitions[0]
            # print(names_and_definitions[0])
            new_hanja['definitions'] = []

        # if both, check if names is empty
        elif len(names_and_definitions[0]) == 0: # no names, yes definitions
            new_hanja['names'] = []
            new_hanja['definitions'] = process_def_list(names_and_definitions[1:])

        else: # yes names, maybe definitions
            first_def = -1
            for i in range(0, len(names_and_definitions)):
                if first_def == -1:
                    index_to_check = 0
                    while names_and_definitions[i][index_to_check] in [' ', "'", '(']:
                        index_to_check += 1

                    c = names_and_definitions[i][index_to_check]
                    if (c >= 'a' and c <= 'z') or (c >= 'A' and c <= 'Z'):
                        first_def = i

            if first_def == -1: # no definitions
                new_hanja['names'] = remove_leading_and_trailing_spaces(names_and_definitions)
                new_hanja['definitions'] = []
            else: # yes definitions
                new_hanja['names'] = remove_leading_and_trailing_spaces(names_and_definitions[0:first_def])
                new_hanja['definitions'] = process_def_list(names_and_definitions[first_def:])

        # if len(names_and_definitions)
        return [new_hanja, current_syllable]



def create_dict(raw_data):

    data_lines = raw_data.split('\n')
    print("File length is: " + str(len(data_lines)))


    hanja_list = []
    next_hanja = 0;
    current_syllable = 0;

    for i in range(0, len(data_lines)):
        # print(data_lines[i])
        [next_hanja, current_syllable] = process_line(data_lines[i], current_syllable)
        if next_hanja != 0:
            hanja_list.append(next_hanja)

    return hanja_list



def write_dict_as_JSON(filename, dict_to_write):
    json_obj = json.dumps(dict_to_write, indent=4)

    with open(filename, "w") as outfile:
        outfile.write(json_obj)



def main():
    # 
    # Creates JSON dictionary file with the following keys:
    # 
    # - character : string, length = 1
    # - pronunciation : string, length = 1
    # - stroke_count : int
    # - names : string array
    # - definitions : string array
    # 
    # takes arguments : read_file, write_file


    # check arguments
    if len(sys.argv) == 1:
        print('please give readfile and writefile')
        exit(1)
    elif len(sys.argv) > 3:
        print('too many arguments')
        exit(1)

    read_filename = sys.argv[1]
    write_filename = sys.argv[2]

    # read file
    file_contents = read_hanja_file(read_filename)

    # format file (take into account blank sections)
    hanja_dict = create_dict(file_contents)

    # write new file to JSON format
    write_dict_as_JSON(write_filename, hanja_dict)



if __name__ == "__main__":
    main()